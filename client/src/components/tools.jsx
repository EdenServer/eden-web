import React from 'react';
import { Menu } from 'semantic-ui-react';

import { createHistory, navigate } from '@reach/router';
import Accounts from './accounts';
import Whosonline from './whosonline';
import Itemsearch from './tools/itemsearch';
import Playersearch from './tools/playersearch';

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

  // This is a temporary override until account management tools are ready.
  // This variable and the conditional rendering below can be removed at that point.
  const showAccountManagementTools = false;

  return (
    <div className="gm_tools">
      <Whosonline />
      <div className="gm_tools-content">
        <Menu pointing>
          {showAccountManagementTools && (
            <Menu.Item
              active={selected === 'account'}
              onClick={updateTab('account')}
            >
              User Management
            </Menu.Item>
          )}
          <Menu.Item active={selected === 'items'} onClick={updateTab('items')}>
            Item Search
          </Menu.Item>
          <Menu.Item active={selected === 'chars'} onClick={updateTab('chars')}>
            Player Search
          </Menu.Item>
        </Menu>
        {selected === 'account' && <Accounts />}
        {(item || selected === 'items') && (
          <Itemsearch itemname={item} itemstack={stack} />
        )}
        {(player || selected === 'chars') && <Playersearch charname={player} />}
      </div>
    </div>
  );
};

export default Tools;
