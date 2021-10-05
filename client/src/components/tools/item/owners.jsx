import React from 'react';
import { Table, Loader } from 'semantic-ui-react';
import { Link } from '@reach/router';
import apiUtil from '../../../apiUtil';

export default ({ itemid }) => {
  const [error, setError] = React.useState(false);
  const [owners, setOwners] = React.useState(null);

  const fetchOwners = () => {
    console.log(itemid);
    setOwners(null);
    apiUtil.get({ url: `/api/v1/items/${itemid}/owners` }, async (error, res) => {
      try {
        if (!error && res.status === 200) {
          setOwners(await res.json());
          setError(false);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    });
  };

  React.useEffect(fetchOwners, [itemid]);

  if (error) {
    return <p>Error fetching item owners...</p>;
  }

  if (!owners) {
    return <Loader active inline />;
  }

  if (owners.length === 0) {
    return <p>No item owners...</p>;
  }

  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            {owners.map((owner, i) => (
              <span key={owner}>
                <Link to={`/tools/player/${owner}`}>{owner}</Link>
                {i + 1 !== owners.length && ', '}
              </span>
            ))}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
