import React from 'react';
import { createHistory, Link, Router, useMatch } from '@reach/router';
import Accounts from './accounts';
import Itemsearch from './tools/itemsearch';
import Playersearch from './tools/playersearch';
import OnlineList from './tools/OnlineList';
import YellTab from './tools/YellTab';
import { Nav } from 'react-bootstrap';

const TabItem = ({ to, activeTab, disabled = false, children }) => {
  console.log(to);
  console.log(activeTab);
  return (
    <Nav.Item>
      <Nav.Link
        as={disabled ? undefined : Link}
        to={disabled ? undefined : to}
        active={to === activeTab}
        disabled={disabled}
      >
        {children}
      </Nav.Link>
    </Nav.Item>
  );
};

const Tools = () => {
  const history = createHistory(window);
  const activeTab = useMatch(':tab/*')?.tab || 'online';

  return (
    <div className="gm_tools">
      <div className="gm_tools-content bg-light py-3">
        <Nav fill variant="tabs" className="mb-3">
          <TabItem to="account" activeTab={activeTab} eventKey="1">
            User Management
          </TabItem>

          <TabItem to="online" activeTab={activeTab} eventKey="2">
            Who's Online
          </TabItem>

          <TabItem to="item" activeTab={activeTab} eventKey="3">
            Item Search
          </TabItem>

          <TabItem to="player" activeTab={activeTab} eventKey="4">
            Player Search
          </TabItem>

          <TabItem to="yells" activeTab={activeTab} eventKey="5">
            Yells
          </TabItem>
        </Nav>
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
