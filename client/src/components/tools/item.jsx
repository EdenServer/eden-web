import { Link } from '@reach/router';
import React from 'react';
import { Accordion, Button, Header, Icon, Image, Loader, Segment } from 'semantic-ui-react';
import apiUtil from '../../apiUtil';
import images from '../../images';
import Ah from './item/ah';
import Bazaar from './item/bazaar';
import Owners from './item/owners';
import owner from '../../owner';
import Crafts from './item/crafts';

const charToElement = (char, line, i) => {
  switch (char) {
    case '':
      return <img key={`desc_ln_${line}_pos_${i}`} alt="fire" src={images.weather.fire} />;
    case '':
      return <img key={`desc_ln_${line}_pos_${i}`} alt="ice" src={images.weather.ice} />;
    case '':
      return <img key={`desc_ln_${line}_pos_${i}`} alt="wind" src={images.weather.wind} />;
    case '':
      return <img key={`desc_ln_${line}_pos_${i}`} alt="earth" src={images.weather.earth} />;
    case '':
      return <img key={`desc_ln_${line}_pos_${i}`} alt="thunder" src={images.weather.thunder} />;
    case '':
      return <img key={`desc_ln_${line}_pos_${i}`} alt="water" src={images.weather.water} />;
    case '':
      return <img key={`desc_ln_${line}_pos_${i}`} alt="light" src={images.weather.light} />;
    case '':
      return <img key={`desc_ln_${line}_pos_${i}`} alt="dark" src={images.weather.dark} />;
    default:
  }

  return '';
};

const descriptionWithElements = (description, line) => {
  const elements = /|||||||/;
  const render = [];
  let lastStop = 0;
  for (let i = 0; i < description.length; i++) {
    const isElement = elements.test(description[i]);
    if (i === description.length - 1) {
      render.push(<span key={`desc_ln_${line}_pos_${i + 1}`}>{description.slice(lastStop, i + 1)}</span>);
    } else if (isElement) {
      if (i !== lastStop) {
        render.push(<span key={`desc_ln_${line}_pos_${i + 1}`}>{description.slice(lastStop, i)}</span>);
      }
      render.push(charToElement(description[i], line, i));
      lastStop = i + 1;
    }
  }
  return <>{render}</>;
};

export default ({ history, itemname, setLoading }) => {
  const params = new URLSearchParams(history.location.search);
  const stack = params.get('stack');

  const [item, setItem] = React.useState(null);
  const [ah, setAh] = React.useState(false);
  const [bazaar, setBazaar] = React.useState(false);
  const [owners, setOwners] = React.useState(false);
  const [crafts, setCrafts] = React.useState(false);
  const isStack = stack === 'true';

  const fetchItem = itemname => {
    if (!itemname) return;

    setLoading(true);
    apiUtil.get({ url: `/api/v1/items/${itemname}`, json: true }, (error, data) => {
      setItem(data);
      setLoading(false);
    });
  };

  const fetchMemoizedItem = React.useCallback(fetchItem);

  React.useEffect(() => {
    const getStack = stack !== null ? stack : false;
    if (itemname) {
      fetchMemoizedItem(encodeURIComponent(itemname), getStack);
    }
  }, [itemname, stack]);

  if (!item) {
    return (
      <Segment>
        <Loader inline style={{ width: '100%' }} />
      </Segment>
    );
  }

  return (
    <Segment>
      <Header>
        <div className="gm_item-header">
          <div className="gm_item-name">
            <Image src={images.item(item.id)} />
            {item.name}
          </div>
          {item.stackable && (
            <Button as={Link} to={`/tools/item/${encodeURIComponent(item.key)}?stack=${!isStack}`} circular color="teal">
              <Icon name={!isStack ? 'boxes' : 'box'} />
              {!isStack ? 'Show Stacks' : 'Show Singles'}
            </Button>
          )}
        </div>
        <div className="eden_item-description">
          {item.desc &&
            item.desc.split('\n').map((s, i) => (
              <p key={`desc_ln_${i}`}>
                {descriptionWithElements(s, i)}
                <br />
              </p>
            ))}
          {item.armor && <p>{item.armor}</p>}
        </div>
      </Header>
      <Accordion fluid styled>
        {owner.owner_item_list.includes(item.id) && (
          <div>
            <Accordion.Title active={owners} onClick={() => setOwners(!owners)}>
              <Icon name="dropdown" />
              Owners
            </Accordion.Title>
            <Accordion.Content active={owners}>
              <Owners itemid={item.id} />
            </Accordion.Content>
          </div>
        )}
        <Accordion.Title active={ah} onClick={() => setAh(!ah)}>
          <Icon name="dropdown" />
          Auction House
        </Accordion.Title>
        <Accordion.Content active={ah}>
          <Ah name={item.key} stack={isStack} />
        </Accordion.Content>
        <Accordion.Title active={bazaar} onClick={() => setBazaar(!bazaar)}>
          <Icon name="dropdown" />
          Bazaar
        </Accordion.Title>
        <Accordion.Content active={bazaar}>
          <Bazaar name={item.key} />
        </Accordion.Content>
        <Accordion.Title active={crafts} onClick={() => setCrafts(!crafts)}>
          <Icon name="dropdown" />
          Crafting
        </Accordion.Title>
        <Accordion.Content active={crafts}>
          <Crafts name={item.key} />
        </Accordion.Content>
      </Accordion>
    </Segment>
  );
};
