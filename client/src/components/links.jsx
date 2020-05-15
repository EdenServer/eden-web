import React from 'react';
import { Card, Image } from 'semantic-ui-react';

import PropTypes from 'prop-types';

function Links(props) {
  const { links } = props;

  return (
    <Card.Group className="gm_links" centered itemsPerRow={3}>
      {links.map(link => (
        <Card key={link.url} href={link.url}>
          <Card.Content>
            {link.image && (
              <Image floated="right" size="mini" src={link.image} />
            )}
            <Card.Header>{link.header}</Card.Header>
            <Card.Description>{link.description}</Card.Description>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
}

Links.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      header: PropTypes.string,
      image: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

Links.defaultProps = {
  links: [],
};

export default Links;
