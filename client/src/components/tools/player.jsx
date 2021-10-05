import { navigate } from '@reach/router';
import React from 'react';
import { Header, Icon, Image, Segment, Loader, Table } from 'semantic-ui-react';
import apiUtil from '../../apiUtil';
import images from '../../images';
import Crafts from './player/crafts';
import Equipment from './player/equipment';
import Jobs from './player/jobs';
import './player/playerStyles.css';
import Sales from './player/sales';

const Linkshell = ({ ls }) => {
  if (!ls || !ls.itemid) {
    return null;
  }

  return (
    <span className="gm_linkshell">
      <img alt="" src={images.item(ls.itemid)} />
      <span>{ls.signature}</span>
    </span>
  );
};

export default ({ charname, setLoading, setSearch }) => {
  const [player, setPlayer] = React.useState(null);
  const [equip, setEquip] = React.useState(null);

  const fetchPlayer = player => {
    if (!player) return;

    setLoading(true);
    apiUtil.get(
      {
        url: `/api/v1/chars/${player}`,
        json: true,
      },
      (error, data) => {
        setPlayer(data);
        setSearch(data.name);
        setLoading(false);
      }
    );
  };

  const fetchMemoizedPlayer = React.useCallback(fetchPlayer);

  React.useEffect(() => {
    if (charname) fetchMemoizedPlayer(charname);
  }, [charname]);

  if (!player) {
    return (
      <Segment>
        <Loader inline style={{ width: '100%' }} />
      </Segment>
    );
  }

  return (
    <Segment>
      <Header>
        <div className="gm_player-header">
          <div className="gm_player-header-left">
            <span className="gm_item-name">
              <Image className="gm_image-spacer" size="mini" rounded src={images.avatar(player.avatar)} />
              {player.name}
            </span>
            <span className="gm_player-title">{player.title}</span>
          </div>
          <div className="eden_player-header-right">
            <Linkshell ls={equip && equip.ls1} />
            <Linkshell ls={equip && equip.ls2} />
            <Icon
              size="small"
              name={player.online === 1 ? 'circle' : 'circle outline'}
              color={player.online === 1 ? 'green' : 'black'}
              disabled={player.online !== 1}
            />{' '}
          </div>
        </div>
      </Header>
      <div className="eden_profile-content">
        <Equipment name={player.name} job={player.jobString} ranks={player.ranks} callback={setEquip} />
        <Jobs {...player.jobs} />
        <Crafts name={player.name} />
      </div>
      <Sales name={player.name} />
    </Segment>
  );
};
