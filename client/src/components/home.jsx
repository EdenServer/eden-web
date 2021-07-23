import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import YellBox from './yellbox';
import TimeInfo from './TimeInfo';
import { useMediaQuery } from 'react-responsive';

function Home(props) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  return (
    <Row className="min-vh-100 flex-column flex-lg-row">
      <Col>
        <TimeInfo />
      </Col>
      {!isTabletOrMobile && (
        <Col lg={4} className="mb-3 mb-lg-0">
          <YellBox />
        </Col>
      )}
    </Row>
  );
}

export default Home;
