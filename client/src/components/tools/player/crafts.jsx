import React from 'react';
import { Button, Loader } from 'semantic-ui-react';
import apiUtil from '../../../apiUtil';

export default ({ name }) => {
  const [error, setError] = React.useState(false);
  const [crafts, setCrafts] = React.useState(null);

  const fetchCrafts = () => {
    setCrafts(null);
    apiUtil.get({ url: `api/v1/chars/${name}/crafts` }, async (error, res) => {
      try {
        if (!error && res.status === 200) {
          setCrafts(await res.json());
          setError(false);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    });
  };

  React.useEffect(fetchCrafts, [name]);

  if (error) {
    return (
      <Button
        circular
        color="orange"
        compact
        icon="refresh"
        onClick={fetchCrafts}
      />
    );
  }

  if (!crafts) {
    return <Loader active inline />;
  }

  return (
    <div className="eden_player-jobs">
      <h6>Crafts</h6>
      <table>
        <tbody>
          {Object.keys(crafts).map(craftname => (
            <tr key={craftname}>
              <td>{`${craftname}:`}</td>
              <td>{crafts[craftname]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
