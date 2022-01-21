import React from 'react';
import { Image, Segment, Icon, Loader, Table } from 'semantic-ui-react';
import { navigate } from '@reach/router';

import Pagination from '../pagination';
import apiUtil from '../../apiUtil';
import images from '../../images';

const OnlineTableHeader = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell style={{ width: '60px' }} />
      <Table.HeaderCell style={{ width: '50%' }}>Name</Table.HeaderCell>
      <Table.HeaderCell>Job</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

const PlayerRow = ({ player }) => (
  <Table.Row className="gm_clickable" onClick={() => navigate(`/tools/player/${player.charname}`)}>
    <Table.Cell>
      <Image rounded className="gm_online-avatar" size="mini" src={images.avatar(player.avatar)} />
    </Table.Cell>
    <Table.Cell>{player.charname}</Table.Cell>
    <Table.Cell>{player.jobString}</Table.Cell>
  </Table.Row>
);

class OnlineList extends React.PureComponent {
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

  componentDidMount() {
    // fetch server status
    apiUtil.get({ url: '/api/v1/misc/status' }, async (error, res) => {
      const status = res.status === 200;
      if (status) {
        const online = await res.text();
        this.setState({ status, online }, () => {
          if (status) this.fetchChars({ limit: 10, offset: 0 });
        });
      } else {
        this.setState({ status, online: 0 });
      }
    });
  }

  fetchChars({ limit, offset }) {
    // fetch online characters
    this.setState({ loading: true });
    apiUtil.get(
      {
        url: `/api/v1/chars?online=true&limit=${limit}&offset=${offset}`,
        json: true,
      },
      (error, data) => {
        if (!error) this.setState({ players: Object.values(data.chars), loading: false });
      }
    );
  }

  render() {
    const { status, players, online, loading } = this.state;
    return (
      <Segment className="gm_tools-container">
        <Segment>
          <Icon name="power off" color={status === true ? 'green' : 'red'} /> Eden is {status === true ? 'online' : 'offline'}
        </Segment>

        <Segment.Group className="gm_online-count" raised>
          <Segment>{online} Characters Online</Segment>
          <Pagination perPageDefault={10} results={parseInt(online, 10)} changePage={this.fetchChars} />

          <Segment>
            <Table selectable>
              <OnlineTableHeader />

              <Table.Body>
                {loading && (
                  <Table.Row>
                    <Table.Cell colSpan="3">
                      <Loader active={loading} centered="true" inline style={{ width: '100%' }} />
                    </Table.Cell>
                  </Table.Row>
                )}

                {!loading && players.map((player, idx) => <PlayerRow key={idx} player={player} />)}
              </Table.Body>
            </Table>
          </Segment>
        </Segment.Group>
      </Segment>
    );
  }
}

export default OnlineList;
