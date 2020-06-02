import React from 'react';
import { Menu } from 'semantic-ui-react';

import { createHistory, navigate } from '@reach/router';
import Accounts from './accounts';
import Itemsearch from './tools/itemsearch';
import Playersearch from './tools/playersearch';
import OnlineList from './tools/OnlineList';

const Tools = () => {
  const history = createHistory(window);
  const [tab, setTab] = React.useState(
    localStorage.getItem('tools.tab') || 'account'
  );
  const params = new URLSearchParams(history.location.search);
  const item = params.get('item');
  const stack = params.get('stack');
  const player = params.get('player');

  let selected = tab;
  if (item) selected = 'items';
  else if (player) selected = 'chars';

  const updateTab = tab => () => {
    navigate('/tools');
    localStorage.setItem('tools.tab', tab);
    setTab(tab);
  };

  return (
    <div className="gm_tools">
      <div className="gm_tools-content">
        <Menu pointing>
          <Menu.Item
            disabled
            active={selected === 'account'}
            onClick={updateTab('account')}
          >
            User Management
          </Menu.Item>
          <Menu.Item
            active={selected === 'online'}
            onClick={updateTab('online')}
          >
            Who's Online
          </Menu.Item>
          <Menu.Item active={selected === 'items'} onClick={updateTab('items')}>
            Item Search
          </Menu.Item>
          <Menu.Item active={selected === 'chars'} onClick={updateTab('chars')}>
            Player Search
          </Menu.Item>
        </Menu>
        {/* {selected === 'account' && <Accounts />} */}
        {selected === 'online' && <OnlineList />}
        {(item || selected === 'items') && (
          <Itemsearch itemname={item} itemstack={stack} />
        )}
        {(player || selected === 'chars') && <Playersearch charname={player} />}
      </div>
    </div>
  );
};

export default Tools;
