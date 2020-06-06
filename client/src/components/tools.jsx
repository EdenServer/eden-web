import React from 'react';
import { createHistory, Link, Router, useMatch } from '@reach/router';
import Accounts from './accounts';
import Itemsearch from './tools/itemsearch';
import Playersearch from './tools/playersearch';
import OnlineList from './tools/OnlineList';
import YellTab from './tools/YellTab';
import { Nav } from 'react-bootstrap';

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
      <div className="gm_tools-content bg-light py-3">
        <Nav fill variant="tabs">
          <Nav.Item>
            <Nav.Link
              to="account"
              disabled
              active={selected === 'account'}
              onClick={updateTab('account')}
              eventKey="1"
            >
              User Management
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              to="online"
              active={selected === 'online'}
              onClick={updateTab('online')}
              eventKey="2"
            >
              Who's Online
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              to="item"
              active={selected === 'items'}
              onClick={updateTab('items')}
              eventKey="3"
            >
              Item Search
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              to="player"
              active={selected === 'chars'}
              onClick={updateTab('chars')}
              eventKey="4"
            >
              Player Search
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              to="yells"
              active={selected === 'yells'}
              onClick={updateTab('yells')}
              eventKey="5"
            >
              Yells
            </Nav.Link>
          </Nav.Item>
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
