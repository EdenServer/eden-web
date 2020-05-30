import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import PropTypes from 'prop-types';

function Links(props) {
  const { links } = props;

  return (
    <Row>
      {links.map(link => (
        <Col xs={12} md={6} xl={3} className="my-2 my-md-3" key={link.url}>
          <Card className="h-100 link-card">
            <Card.Header>
              <div className="d-flex flex-row justify-content-between">
                <Card.Title>
                  <a
                    href={link.url}
                    className="stretched-link text-dark"
                    style={{ textDecoration: 'none' }}
                  >
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
        </Col>
      ))}
    </Row>
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
