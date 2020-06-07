import React from 'react';
import { Image, Card, List, Loader } from 'semantic-ui-react';
import apiUtil from '../../apiUtil';
import images from '../../images';

const formatString = string =>
  string
    .split('_')
    .map(str => {
      return `${str.substr(0, 1).toUpperCase()}${str.substr(1, str.length)}`;
    })
    .join(' ');

const Recipe = ({ recipe, index }) => {
  const { requirements } = recipe;
  return (
    <Card>
      <Card.Content>
        <Image
          className="gm_image-spacer"
          floated="right"
          size="mini"
          src={images.item(recipe.crystal)}
        />
        <Card.Header>{`${recipe.requirements[0].name} (${recipe.requirements[0].level})`}</Card.Header>
        {requirements.length > 1 && (
          <Card.Meta>
            {requirements.slice(1).map((req, i) => {
              return <div key={`req_${i}`}>{`${req.name} (${req.level})`}</div>;
            })}
          </Card.Meta>
        )}
        <List>
          {Object.values(recipe.ingredients).map((ingredient, i) => (
            <List.Item key={`ing_${index}_${i}`}>
              <List.Content>
                <Image src={images.item(ingredient.itemid)} />
                {`${formatString(ingredient.name)} ${
                  ingredient.count === 1 ? '' : `(${ingredient.count})`
                }`}
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Card.Content>
      <Card.Content extra>
        <List>
          {Object.values(recipe.results).map((result, i) => (
            <List.Item key={`res_${index}_${i}`}>
              <List.Content>
                {`${result.type === 'Normal' ? 'NQ' : result.type}: `}
                <Image src={images.item(result.itemid)} />
                {`${formatString(result.name)} ${
                  result.count === 1 ? '' : `(${result.count})`
                }`}
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Card.Content>
    </Card>
  );
};

const Crafting = ({ name }) => {
  const [error, setError] = React.useState(false);
  const [crafts, setCrafts] = React.useState(null);
  console.log(crafts);

  const fetchCrafts = () => {
    setCrafts(null);
    apiUtil.get({ url: `/api/v1/items/${name}/crafts` }, async (error, res) => {
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
    return <p>Error fetching auction house history...</p>;
  }

  if (!crafts) {
    return <Loader active inline />;
  }

  if (crafts.length === 0) {
    return <p>No auction house history...</p>;
  }

  return (
    <Card.Group centered>
      {crafts.map((recipe, i) => (
        <Recipe recipe={recipe} index={i} />
      ))}
    </Card.Group>
  );
};

export default Crafting;
