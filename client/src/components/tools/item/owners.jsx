import React from 'react';
import { Table, Loader } from 'semantic-ui-react';
import { Link } from '@reach/router';
import apiUtil from '../../../apiUtil';

export default ({ name }) => {
  const [error, setError] = React.useState(false);
  const [owners, setOwners] = React.useState(null);

  const fetchOwners = () => {
    setOwners(null);
    apiUtil.get({ url: `/api/v1/items/${name}/owners` }, async (error, res) => {
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

  React.useEffect(fetchOwners, [name]);

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
            <span>
              <Link to={`/tools/player/${owner.charname}`}>{owner.charname}</Link>&nbsp;&nbsp;</span>
        ))}
          </Table.Cell>
          </Table.Row>
      </Table.Body>
    </Table>
  );
};
