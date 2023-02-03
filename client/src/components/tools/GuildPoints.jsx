import React from 'react';
import { Segment, Table, Image, Loader } from 'semantic-ui-react';
import { Link } from '@reach/router';
import apiUtil from '../../apiUtil';

const GuildRankHeader = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell> </Table.HeaderCell>
      <Table.HeaderCell>Novice</Table.HeaderCell>
      <Table.HeaderCell>Apprentice</Table.HeaderCell>
      <Table.HeaderCell>Journeyman</Table.HeaderCell>
      <Table.HeaderCell>Craftsman</Table.HeaderCell>
      <Table.HeaderCell>Artisan</Table.HeaderCell>
      <Table.HeaderCell>Adept</Table.HeaderCell>
      <Table.HeaderCell>Veteran</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

const GuildPointItem = ({ item }) => (
  <Table.Cell>
    <Link to={`/tools/item/${item.id}`}>
      <Image rounded className="gm_online-avatar" size="mini" src={`https://static.ffxiah.com/images/icon/${item.id}.png`} />
    </Link>
    <p>{item.item}</p>
    <p>
      {item.points} / {item.max_points}
    </p>
    <p>({(item.max_points / item.points).toFixed(2)} items)</p>
  </Table.Cell>
);

const GuildPointRow = ({ guild, data }) => (
  <Table.Row>
    <Table.Cell>{guild}</Table.Cell>
    {data[guild].map((item, i) => (
      <GuildPointItem key={i} item={item} />
    ))}
  </Table.Row>
);

const GuildPoints = () => {
  const [gpitems, setGuildPointItems] = React.useState([]);

  React.useEffect(() => {
    apiUtil.get(
      {
        url: `/api/v1/guilds/points`,
        json: true,
      },
      (error, data) => {
        if (!error) {
          setGuildPointItems(data);
        }
      }
    );
  }, []);
  if (Object.keys(gpitems).length === 0) {
    return (
      <Segment className="gm_tools-container">
        <p style={{ textAlign: 'center' }}>Pending new pattern! Check back soon.</p>
      </Segment>
    );
  }
  return (
    <Segment className="gm_tools-container">
      <Table selectable>
        <GuildRankHeader />
        <Table.Body>
          {Object.keys(gpitems).map((guild, i) => (
            <GuildPointRow key={i} guild={guild} data={gpitems} />
          ))}
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default GuildPoints;
