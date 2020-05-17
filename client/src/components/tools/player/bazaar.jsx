import React from 'react';
import { Table, Loader } from 'semantic-ui-react';
import { Link } from '@reach/router';
import apiUtil from '../../../apiUtil';

const formatItem = itemname => {
  return (
    <Link to={`/tools?item=${encodeURIComponent(itemname)}`}>
      {itemname
        .split('_')
        .map(string => {
          return `${string.substr(0, 1).toUpperCase()}${string.substr(
            1,
            string.length
          )}`;
        })
        .join(' ')}
    </Link>
  );
};

export default ({ name }) => {
  const [error, setError] = React.useState(false);
  const [bazaar, setBazaar] = React.useState(null);

  const fetchBazaar = () => {
    setBazaar(null);
    apiUtil.get({ url: `api/v1/chars/${name}/bazaar` }, async (error, res) => {
      if (res.status === 200) {
        setBazaar(await res.json());
        setError(false);
      } else {
        setError(true);
      }
    });
  };

  React.useEffect(fetchBazaar, [name]);

  if (error) {
    return <p>Error fetching bazaar items...</p>;
  }

  if (!bazaar) {
    return <Loader active inline />;
  }

  if (bazaar.length === 0) {
    return <p>No bazaar items...</p>;
  }

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Item</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {bazaar.map((sell, i) => (
          <Table.Row key={`ah_history_${i}`}>
            <Table.Cell>{formatItem(sell.name)}</Table.Cell>
            <Table.Cell>{`${sell.bazaar.toLocaleString()}g`}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
