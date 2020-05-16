import React from 'react';
import { Container, Row, Col, CardColumns, Card } from 'react-bootstrap';

import PropTypes from 'prop-types';

function Links(props) {
  const { links } = props;

  return (
    <Container fluid className="my-3">
      <Row>
        {links.map(link => (
          <Col xs={12} md={6} lg={4} xl={3} className="my-2 my-md-3">
            <Card key={link.url} className="h-100">
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
          </Col>
        ))}
      </Row>
    </Container>
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
