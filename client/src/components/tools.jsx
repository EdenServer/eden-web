import React from 'react';
import { Menu } from 'semantic-ui-react';

import { createHistory, Link, Router, useMatch } from '@reach/router';
import Accounts from './accounts';
import Itemsearch from './tools/itemsearch';
import Playersearch from './tools/playersearch';
import OnlineList from './tools/OnlineList';
import YellTab from './tools/YellTab';

const TabItem = ({ to, activeTab, disabled = false, children }) => (
  <Menu.Item
    as={disabled ? undefined : Link}
    to={disabled ? undefined : to}
    active={to === activeTab}
    disabled={disabled}
  >
    {children}
  </Menu.Item>
);

const Tools = () => {
  const history = createHistory(window);
  const activeTab = useMatch(':tab/*')?.tab || 'online';

  return (
    <div className="gm_tools">
      <div className="gm_tools-content">
        <Menu pointing className="wrapped">
          <TabItem to="account" disabled activeTab={activeTab}>
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
        </Menu>
        <Router>
          <OnlineList path="/" />
          <OnlineList path="online" />
          {/* <Accounts path="account" /> */}
          <Itemsearch path="item/*" history={history} />
          <Playersearch path="player/*" history={history} />
          <YellTab path="yells" />
        </Router>
      </div>
    </div>
  );
};

export default Tools;
