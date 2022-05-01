import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import InfoDisplay from '../InfoDisplay';

const About = () => {
  return (
    <>
      <Row className="mb-3">
        <Col>
          <InfoDisplay title={"What's Different between Eden, other private servers, and retail?"}>
            <Card.Text>
              Eden was created in part to recreate the era experience as close as possible. We define era as anything that happened up to and including the
              September 2008 patch. While FFXI is still a great game today, it is vastly different than it was in 2007/2008. We don't aim to take the place of
              retail today, and we encourage you to subscribe to it, if nothing else to finish the amazing storyline.
            </Card.Text>
            <Card.Text>
              Many past players of FFXI long for the days of a cooperative environment where "quality of life" was an afterthought. Because there is no classic
              solution from SQUARE ENIX CO., LTD, Eden was created to fill that desire. Our vision is to recreate the 2007 era experience as closely as possible
              with as few deviations as possible.
            </Card.Text>
            <Card.Text>
              While all private servers have some deviation from era retail, we strive to be as close to possible, and as such do extensive research on
              everything before implementing it. This includes everything from mob behavior, damage calculations, and magic hit rate, to having each individual
              battle and event be as close as possible to the true era experience.
            </Card.Text>
          </InfoDisplay>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <InfoDisplay title="How has Eden deviated from retail?">
            <Card.Text>
              While our ultimate goal is to mimic era as closely as possible, there are a handful of deviations from era highlighted below. These items are
              subject to change as the playerbase and game evolves.
            </Card.Text>
            <table className="ui celled table">
              <thead>
                <tr>
                  <th>Eden Implementation</th>
                  <th>Retail Era Implementation</th>
                  <th>Reasoning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PUP has a B in h2h rating</td>
                  <td>PUP has a C+ in h2h rating</td>
                  <td>balance</td>
                </tr>
                <tr>
                  <td>PUP Automatons have retail magic casting AI which gives them a recast timer for each magic type</td>
                  <td>The PUP's Automaton had a shared recast timer for all magic types.</td>
                  <td>balance</td>
                </tr>
                <tr>
                  <td>The auction house has unlimited listings, is shared across all areas and items expire after 30 real life days</td>
                  <td>The auction house is limited to 7 listings, had distinct AHs per city/region, and items expire after 3 real life days</td>
                  <td>economy</td>
                </tr>
                <tr>
                  <td>
                    Wardrobe 1 is awarded by talking to your Moogle after attaining Rank 3, Wardrobe 2 by talking to your Moogle after attaining Rank 6, and
                    Wardrobe 3 is unlocked by completing Apocalpyse Nigh.
                  </td>
                  <td>Wardrobes were not available.</td>
                  <td>economy</td>
                </tr>
                <tr>
                  <td>Some Ores/Logs/Hides/Beastman armor et. cetera stack</td>
                  <td>Some Ores/Logs/Hides/Beastman armor et. cetera did not stack</td>
                  <td>economy</td>
                </tr>
                <tr>
                  <td>Power leveling dirties exp if the PL draws hate</td>
                  <td>Power leveling did not dirty exp.</td>
                  <td>economy</td>
                </tr>
                <tr>
                  <td>Current retail fishing mini-game</td>
                  <td>Era retail fishing mini-game</td>
                  <td>technical limitations / cheat prevention</td>
                </tr>
                <tr>
                  <td>Original difficulty CoP missions</td>
                  <td>Era difficulty CoP missions and era item flags</td>
                  <td>teamwork</td>
                </tr>
                <tr>
                  <td>Mobs that link automatically dirty exp to person that linked</td>
                  <td>Mobs did not dirty exp until an action was performed on them</td>
                  <td>teamwork</td>
                </tr>
                <tr>
                  <td>Some mobs do not reset their window when the server is reset</td>
                  <td>Some mobs windows would reset when a server was reset or crashed</td>
                  <td>economy</td>
                </tr>
                <tr>
                  <td>Level Sync</td>
                  <td>No Level Sync</td>
                  <td>teamwork</td>
                </tr>
                <tr>
                  <td>Mythic Weapons (currently unavailable)</td>
                  <td>Mythic weapons did not exist</td>
                  <td>toau content</td>
                </tr>
              </tbody>
            </table>
          </InfoDisplay>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <InfoDisplay title="How can I help?">
            <Card.Text>
              There are several ways to help. You can fill out <a href="https://github.com/EdenServer/community/issues">bug reports</a>, report players who are
              cheating by using the in-game ticketing system, volunteer as a staff member or tester, contribute code, or help out in the #tech-support discord
              channel.
            </Card.Text>
            <Card.Text>
              Eden does not accept donations or any other form of monetary contribution. Requests for real money payment should be reported to any staff member
              via discord.
            </Card.Text>
          </InfoDisplay>
        </Col>
      </Row>
    </>
  );
};

export default About;
