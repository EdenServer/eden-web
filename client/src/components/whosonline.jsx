import React from 'react';
import { Card, Image, Segment, Icon, Loader } from 'semantic-ui-react';
import { Link } from '@reach/router';

import Pagination from './pagination';
import apiUtil from '../apiUtil';
import images from '../images';

const Player = ({ player }) => (
  <Card as={Link} to={`/tools?player=${player.charname}`}>
    <Card.Content>
      <Image
        rounded
        className="gm_online-avatar"
        floated="right"
        size="mini"
        src={images.avatar(player.avatar)}
      />
      <Card.Header>{player.charname}</Card.Header>
      <Card.Meta>{player.jobString}</Card.Meta>
    </Card.Content>
    <Card.Content extra>{player.title}</Card.Content>
  </Card>
);

class Whosonline extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      players: [],
      online: '0',
      loading: false,
    };

    this.fetchChars = this.fetchChars.bind(this);
  }

  fetchChars({ limit, offset }) {
    // fetch online characters
    apiUtil.get(
      {
        url: `/api/v1/chars?online=true&limit=${limit}&offset=${offset}`,
        json: true,
      },
      (error, data) => {
        if (!error)
          this.setState({ players: Object.values(data.chars), loading: false });
      }
    );
  }

  componentDidMount() {
    // fetch server status
    apiUtil.get({ url: '/api/v1/misc/status' }, async (error, res) => {
      const status = res.status === 200;
      if (status) {
        const online = await res.text();
        this.setState({ status, online }, () => {
          if (status) this.fetchChars({ limit: 100, offset: 0 });
        });
      } else {
        this.setState({ status, online: 0 });
      }
    });
  }

  render() {
    const { status, players, online, loading } = this.state;
    return (
      <div className="gm_whosonline">
        <Segment.Group className="gm_online-count" raised>
          <Segment>
            <Icon name="power off" color={status === true ? 'green' : 'red'} />{' '}
            Eden is {status === true ? 'online' : 'offline'}
          </Segment>
          <Segment>{online} Characters Online</Segment>
          <Pagination
            perPageDefault={100}
            results={parseInt(online, 10)}
            changePage={this.fetchChars}
          />
        </Segment.Group>
        <Loader active={loading} inline style={{ width: '100%' }} />
        {!loading && players.length > 0 && (
          <Card.Group className="gm_players-online" centered itemsPerRow={1}>
            {players.map((p, i) => (
              <Player key={`player_${i}`} player={p} />
            ))}
          </Card.Group>
        )}
      </div>
    );
  }
}

export default Whosonline;
