import React, { useMemo } from 'react';
import { Menu } from 'semantic-ui-react';

import { createHistory, Link, Router, useMatch } from '@reach/router';
import JWTReader from 'jwt-client';
import Admin from './tools/admin';
import Accounts from './accounts';
import Itemsearch from './tools/itemsearch';
import Playersearch from './tools/playersearch';
import OnlineList from './tools/OnlineList';
import YellTab from './tools/YellTab';
import GuildPoints from './tools/GuildPoints';

const TabItem = ({ to, activeTab, disabled = false, children }) => (
  <Menu.Item as={disabled ? undefined : Link} to={disabled ? undefined : to} active={to === activeTab} disabled={disabled}>
    {children}
  </Menu.Item>
);

const Tools = () => {
  const history = createHistory(window);
  const activeTab = useMatch(':tab/*')?.tab || 'online';
  const jwt = localStorage.getItem('jwt');
  const canPost = useMemo(() => (jwt != null ? (JWTReader.read(jwt)?.claim?.privileges ?? []).includes('WEB_SCRIBE') : false), [jwt]);

  return (
    <div className="gm_tools">
      <div className="gm_tools-content">
        <Menu pointing className="wrapped">
          {canPost && (
            <TabItem to="admin" activeTab={activeTab}>
              Administration
            </TabItem>
          )}
          <TabItem to="account" activeTab={activeTab}>
            User Management
          </TabItem>
          <TabItem to="online" activeTab={activeTab}>
            Who's Online
          </TabItem>
          <TabItem to="item" activeTab={activeTab}>
            Item Search
          </TabItem>
          <TabItem to="player" activeTab={activeTab}>
            Player Search
          </TabItem>
          <TabItem to="yells" activeTab={activeTab}>
            Yells
          </TabItem>
          <TabItem to="guilds" activeTab={activeTab}>
            Guild Points
          </TabItem>
        </Menu>
        <Router>
          <OnlineList path="/" />
          <OnlineList path="online" />
          <Admin path="admin" />
          <Accounts path="account" />
          <Itemsearch path="item/*" history={history} />
          <Playersearch path="player/*" history={history} />
          <YellTab path="yells" />
          <GuildPoints path="guilds" />
        </Router>
      </div>
    </div>
  );
};

export default Tools;
