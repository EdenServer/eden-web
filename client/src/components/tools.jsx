import React from 'react';
import { Menu } from 'semantic-ui-react';

import { createHistory, Link, Router } from '@reach/router';
import Accounts from './accounts';
import Itemsearch from './tools/itemsearch';
import Playersearch from './tools/playersearch';
import OnlineList from './tools/OnlineList';
import YellTab from './tools/YellTab';

const Tools = () => {
  const history = createHistory(window);

  return (
    <div className="gm_tools">
      <div className="gm_tools-content">
        <Menu pointing>
          <Menu.Item disabled>
            {/*as={Link} to="account" */}
            User Management
          </Menu.Item>
          <Menu.Item as={Link} to="online">
            Who's Online
          </Menu.Item>
          <Menu.Item as={Link} to="item">
            Item Search
          </Menu.Item>
          <Menu.Item as={Link} to="player">
            Player Search
          </Menu.Item>
          <Menu.Item as={Link} to="yells">
            Yells
          </Menu.Item>
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
