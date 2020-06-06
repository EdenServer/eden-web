import React from 'react';
import { createHistory, navigate } from '@reach/router';
import Accounts from './accounts';
import Itemsearch from './tools/itemsearch';
import Playersearch from './tools/playersearch';
import OnlineList from './tools/OnlineList';
import YellTab from './tools/YellTab';
import { Nav } from 'react-bootstrap';

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
      <div className="gm_tools-content bg-light py-3">
        <Nav fill variant="tabs">
          <Nav.Item>
            <Nav.Link
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
              active={selected === 'online'}
              onClick={updateTab('online')}
              eventKey="2"
            >
              Who's Online
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={selected === 'items'}
              onClick={updateTab('items')}
              eventKey="3"
            >
              Item Search
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              active={selected === 'chars'}
              onClick={updateTab('chars')}
              eventKey="4"
            >
              Player Search
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              active={selected === 'yells'}
              onClick={updateTab('yells')}
              eventKey="5"
            >
              Yells
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {/* {selected === 'account' && <Accounts />} */}
        {selected === 'online' && <OnlineList />}
        {(item || selected === 'items') && (
          <Itemsearch itemname={item} itemstack={stack} />
        )}
        {(player || selected === 'chars') && <Playersearch charname={player} />}
        {selected === 'yells' && <YellTab />}
      </div>
    </div>
  );
};

export default Tools;
