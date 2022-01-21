import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import YellBox from './yellbox';
import TimeInfo from './TimeInfo';
import InfoDisplay from './InfoDisplay';

function Home({ discordLink }) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  return (
    <Row className="min-vh-100 flex-column flex-lg-row">
      <Col>
        <InfoDisplay title="Welcome to Eden!">
          <Card.Text>
            Eden attempts to recreate the Treasures of Aht Urhgan era experience with a few quality-of-life additions. While FFXI is still a great game today,
            it is vastly different than it was back in 2007. We don't aim to take the place of retail today, and we encourage you to subscribe to it, if for
            nothing else than to finish the amazing storyline!
          </Card.Text>
          <Card.Text>
            While all private servers have some deviation from era retail, we strive to be as close to possible, and as such do extensive research on everything
            before implementing it. This includes everything from mob behavior, damage calculations, and magic hit rate, to having each individual battle and
            event be as close as possible to the true era experience.
          </Card.Text>
          <Card.Text>
            <a href={discordLink} target="_blank" rel="noreferrer">
              Join our Discord
            </a>{' '}
            to learn more!
          </Card.Text>
        </InfoDisplay>
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
