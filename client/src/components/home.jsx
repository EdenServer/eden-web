import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import Yells from './yellbox';
import News from './newsbox';

export default ({ posts }) => (
  <div className="gm_home">
    <Yells />
    {posts && <News posts={posts} />}
  </div>
);
