import React from 'react';
import Yells from './yellbox';
import News from './newsbox';

export default ({ posts }) => (
    <div className="gm_home">
        <Yells />
        <News posts={posts} />
    </div>
);
