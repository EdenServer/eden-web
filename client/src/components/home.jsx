import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import Yells from './yellbox';
import News from './newsbox';

function Home(props) {
  const { posts } = props;

  return (
    <Row noGutters className="h-100">
      <Col xs={12} lg={4}>
        <Yells className="my-3 my-lg-0" />
      </Col>
      <Col>{posts && <News posts={posts} />}</Col>
    </Row>
  );
}

Home.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string,
      data: PropTypes.string,
      message: PropTypes.string,
      title: PropTypes.string,
    })
  ),
};

Home.defaultProps = {
  posts: [],
};

export default Home;
