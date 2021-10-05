import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const SiteFooter = () => {
  return (
    <Container fluid className="w-100 bg-dark text-light text-center">
      <Row>
        <Col xs={12} lg className="my-auto">
          <p className="h4 p-3">
            <b>EDEN</b> | Classic FFXI Emulation Server
          </p>
        </Col>
        <Col xs={12} lg className="my-auto">
          <p className="text-light">
            <small>
              All FINAL FANTASY&reg; XI content and images &copy; 2002-
              {new Date().getFullYear()}
              SQUARE ENIX CO., LTD. All Rights Reserved.
              <br />
              FINAL FANTASY&reg; is a registered trademark of SQUARE ENIX CO., LTD. All Rights Reserved.
            </small>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SiteFooter;
