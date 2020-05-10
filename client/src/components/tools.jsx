import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import Accounts from './accounts';
import Whosonline from './whosonline';
import Itemsearch from './tools/itemsearch';
import Playersearch from './tools/playersearch';

const Tools = props => {
  const { history } = props;
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
    history.push('/tools');
    localStorage.setItem('tools.tab', tab);
    setTab(tab);
  };

  return (
    <div className="gm_tools">
      <Whosonline />
      <div className="gm_tools-content">
        <Menu pointing>
          <Menu.Item
            active={selected === 'account'}
            onClick={updateTab('account')}
          >
            User Management
          </Menu.Item>
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

Tools.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // this comes from <Router> ('react-router')
};

export default withRouter(Tools);
