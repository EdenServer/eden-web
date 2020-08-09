import React from 'react';
import { Table, Loader } from 'semantic-ui-react';
import { Link } from '@reach/router';
import apiUtil from '../../../apiUtil';

const formatItem = (itemname, stacksize) => {
  return (
    <Link to={`/tools/item/${encodeURIComponent(itemname)}`}>
      {itemname
        .split('_')
        .map(string => {
          return `${string.substr(0, 1).toUpperCase()}${string.substr(
            1,
            string.length
          )}`;
        })
        .join(' ') + (stacksize === '1' ? '' : ' x' + stacksize)}
    </Link>
  );
};

const formatPlayerLink = (player, target) => {
  if (player === target) return player;

  return <Link to={`/tools/player/${target}`}>{target}</Link>;
};

export default ({ name }) => {
  const [error, setError] = React.useState(false);
  const [ah, setAh] = React.useState(null);

  const fetchAh = () => {
    setAh(null);
    apiUtil.get({ url: `/api/v1/chars/${name}/ah` }, async (error, res) => {
      try {
        if (!error && res.status === 200) {
          setAh(await res.json());
          setError(false);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    });
  };

  React.useEffect(fetchAh, [name]);

  if (error) {
    return <p>Error fetching auction house history...</p>;
  }

  if (!ah) {
    return <Loader active inline />;
  }

  if (ah.length === 0) {
    return <p>No auction house history...</p>;
  }

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Item</Table.HeaderCell>
          <Table.HeaderCell>Seller</Table.HeaderCell>
          <Table.HeaderCell>Buyer</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {ah.map((history, i) => {
          const date = new Date(history.sell_date * 1000);
          return (
            <Table.Row key={`ah_history_${i}`}>
              <Table.Cell>{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</Table.Cell>
              <Table.Cell>
                {formatItem(history.name, history.stack_size)}
              </Table.Cell>
              <Table.Cell>
                {formatPlayerLink(name, history.seller_name)}
              </Table.Cell>
              <Table.Cell>
                {formatPlayerLink(name, history.buyer_name)}
              </Table.Cell>
              <Table.Cell>{`${history.sale.toLocaleString()}g`}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
