import React from 'react';
import { Segment, Icon, Image, Header } from 'semantic-ui-react';

import Jobs from './player/jobs';
import Equipment from './player/equipment';
import Crafts from './player/crafts';
import Sales from './player/sales';
import images from '../../images';

import './player/playerStyles.css';

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

export default ({ player }) => {
  const [equip, setEquip] = React.useState(null);
  return (
    <Segment>
      <Header>
        <div className="gm_player-header">
          <div className="gm_player-header-left">
            <span className="gm_item-name">
              <Image
                className="gm_image-spacer"
                size="mini"
                rounded
                src={images.avatar(player.avatar)}
              />
              {player.name}
            </span>
            <span className="gm_player-title">{player.title}</span>
          </div>
          <div className="eden_player-header-right">
            <Linkshell ls={equip && equip.ls1} />
            <Linkshell ls={equip && equip.ls2} />
            <Icon name="power off" color={player.online ? 'green' : 'red'} />
          </div>
        </div>
      </Header>
      <div className="eden_profile-content">
        <Equipment
          name={player.name}
          job={player.jobString}
          ranks={player.ranks}
          callback={setEquip}
        />
        <Jobs {...player.jobs} />
        <Crafts name={player.name} />
      </div>
      <Sales name={player.name} />
    </Segment>
  );
};
