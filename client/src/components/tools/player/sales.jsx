import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';

import Ah from './ah';
import Bazaar from './bazaar';

export default ({ name }) => {
  const [ah, setAh] = React.useState(false);
  const [bazaar, setBazaar] = React.useState(false);

  return (
    <Accordion fluid styled>
      <Accordion.Title active={ah} onClick={() => setAh(!ah)}>
        <Icon name="dropdown" />
        Auction House
      </Accordion.Title>
      <Accordion.Content active={ah}>
        <Ah name={name} />
      </Accordion.Content>
      <Accordion.Title active={bazaar} onClick={() => setBazaar(!bazaar)}>
        <Icon name="dropdown" />
        Bazaar
      </Accordion.Title>
      <Accordion.Content active={bazaar}>
        <Bazaar name={name} />
      </Accordion.Content>
    </Accordion>
  );
};
