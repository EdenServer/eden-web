import React from 'react';
import { CardColumns, Card } from 'react-bootstrap';

import PropTypes from 'prop-types';

function Links(props) {
  const { links } = props;

  return (
    <CardColumns className="m-3">
      {links.map(link => (
        <Card key={link.url}>
          <Card.Header>
            <div className="d-flex flex-row justify-content-between">
              <Card.Title>
                <a href={link.url} className="stretched-link text-dark">
                  {link.header}
                </a>
              </Card.Title>
              {link.image && (
                <img alt="" src={link.image} style={{ maxWidth: '35px' }} />
              )}
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Text>{link.description}</Card.Text>
            <Card.Link />
          </Card.Body>
        </Card>
      ))}
    </CardColumns>
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
