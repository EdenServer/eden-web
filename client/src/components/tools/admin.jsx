import React from 'react';
import { useMediaQuery } from 'react-responsive';

function Home({ discordLink }) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  return <div>test</div>;
}

export default Home;
