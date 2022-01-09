import { json } from 'body-parser';
import React, { useState } from 'react';
import { Image, Card, List, Loader } from 'semantic-ui-react';
import apiUtil from '../../../apiUtil';
import images from '../../../images';
import crafts from '../player/crafts';

const formatString = string =>
  string
    .split('_')
    .map(str => {
      return `${str.substr(0, 1).toUpperCase()}${str.substr(1, str.length)}`;
    })
    .join(' ');

const formatRecipe = recipeToParse => {
  //Match and correct craft name
  const craftNames = {
    Alchemy: 'Alchemy',
    Bone: 'Bonecraft',
    Cloth: 'Clothcraft',
    Cook: 'Cooking',
    Gold: 'Goldsmithing',
    Leather: 'Leathercraft',
    Smith: 'Smithing',
    Wood: 'Woodworking',
  };
  //Initialize subarrays for storing enumerable data
  recipeToParse['requirements'] = [];
  recipeToParse['ingredients'] = [];
  recipeToParse['results'] = [];

  /*
  All keys are iterated through to match key/value for extraction.
  Data is then put into subarrays for further processing.
  */
  Object.keys(recipeToParse).map(keyName => {
    //Collect craft level values
    if (Object.keys(craftNames).includes(keyName) && recipeToParse[keyName] > 0) {
      recipeToParse['requirements'].push({
        name: craftNames[keyName],
        level: recipeToParse[keyName],
      });
      //Collect ingredients
    } else if (keyName.startsWith('Ingredient') && recipeToParse[keyName] > 0) {
      //Checking for duplicates to condense count
      if (recipeToParse['ingredients'].some(e => e.itemid == recipeToParse[keyName])) {
        var foundIndex = recipeToParse['ingredients'].findIndex(x => x.itemid == recipeToParse[keyName]);
        recipeToParse['ingredients'][foundIndex]['count'] += 1;
      } else {
        recipeToParse['ingredients'].push({
          name: recipeToParse[keyName + 'Name'],
          itemid: recipeToParse[keyName],
          count: 1,
        });
      }
      //Collect NQ/HQ Results
    } else if (keyName.startsWith('Result') && !keyName.endsWith('Qty') && recipeToParse[keyName] > 0) {
      recipeToParse['results'].push({
        name: recipeToParse[keyName + 'Name'],
        count: recipeToParse[keyName + 'Qty'],
        type: keyName.replace('Result', '') == '' ? 'Normal' : keyName.replace('Result', ''),
        itemid: recipeToParse[keyName],
      });
    }
  });
  //Crafts sorted by level to determine main craft.
  recipeToParse.requirements.sort(function (a, b) {
    var x = a.level > b.level ? -1 : 1;
    return x;
  });
  return recipeToParse;
};

const Recipe = ({ recipe, index }) => {
  recipe = formatRecipe(recipe);
  return (
    <Card>
      <Card.Content>
        <Image className="gm_image-spacer" floated="right" size="mini" src={images.item(recipe.Crystal)} />
        <Card.Header>{`${recipe.requirements[0].name} (${recipe.requirements[0].level})`}</Card.Header>
        {recipe.requirements.length > 1 && (
          <Card.Meta>
            {recipe.requirements.slice(1).map((req, i) => {
              return <div key={`req_${i}`}>{`${req.name} (${req.level})`}</div>;
            })}
          </Card.Meta>
        )}
        <List>
          {Object.values(recipe.ingredients).map((ingredient, i) => (
            <List.Item key={`ing_${index}_${i}`}>
              <List.Content>
                <Image src={images.item(ingredient.itemid)} />
                {` ${formatString(ingredient.name)} ${ingredient.count === 1 ? '' : `(${ingredient.count})`}`}
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
                {`${result.type === 'Normal' ? result.name : formatString(result.name)} ${result.count === 1 ? '' : `(${result.count})`}`}
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
    return <p>Error fetching recipes...</p>;
  }

  if (!crafts) {
    return <Loader active inline />;
  }

  if (crafts.length === 0) {
    return <p>No recipe...</p>;
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
