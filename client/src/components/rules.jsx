import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import InfoDisplay from './InfoDisplay';
import { Row, Col, Table } from 'react-bootstrap';

const Rules = ({ list }) => {
  const { terms, rules, software, yells, search, discord } = list;

  const seperateLines = string => {
    const lines = string.split('\n');
    if (lines.length <= 1) return string;

    return lines.map(l => <p className="gm_lineseperate">{l}</p>);
  };

  return (
    <>
      <Row className="mb-3">
        <Col>
          <InfoDisplay title="Terms and Conditions">
            <ol>
              {terms.list.map((t, i) => (
                <li key={`term_${i}`}>{t}</li>
              ))}
            </ol>
            <small>Updated {terms.updated}</small>
          </InfoDisplay>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <InfoDisplay title="Formal Rules">
            <Card.Text>
              Listed here is a list of formal rules. It will be expanded upon
              and modified in the future so please stay as current as
              realistically possible with them. If you see someone breaking the
              rules,{' '}
              <b>
                <u>please do not report them in public forums like Discord</u>
              </b>
              . Either let them know they should stop, or call a GM using the in
              game Help Desk. Staff takes these reports seriously and we follow
              up on each one, but we do not want anybody shamed publicly for
              things they are simply suspected of. Once staff concludes if they
              are cheating or not, we will take appropriate action.
            </Card.Text>
            <Card.Text>
              Regarding behavior: we don&apos;t have an all inclusive code of
              conduct manual for you to read so use common sense. If you are
              doing something that would have gotten you banned or in trouble on
              retail, it is more than likely against the rules here too. If you
              are doing inappropriate things that you wouldn&apos;t do to your
              friends--please think twice about it. Finally, if a GM asks you to
              stop a behavior--saying &quot;it isn&apos;t in the rules&quot; is
              not a valid excuse for ignoring the GM.
            </Card.Text>
            <Card.Text>
              We give our GMs the responsibility to uphold rules in the essence
              of fair play as well as to ensure that other&apos;s play
              experience is not effected negatively, not all rules will be
              listed as some must be handled on a case by case basis, Our GM
              staff upholds communication between themselves in order to ensure
              a consistency in policy and has measures to ensure that this does
              not get abused,{' '}
              <b>
                ALL GM requests must be upheld and if something is found to be
                wrong with a certain request it will be dealt with accordingly.
                In the event you feel a GM&apos;s judgement was off you may
                contact a council member via webform on the website tools
              </b>
            </Card.Text>
            <ol>
              {rules.list.map((t, i) => (
                <li key={`term_${i}`}>{t}</li>
              ))}
            </ol>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Rule</th>
                  <th>Consequence</th>
                </tr>
              </thead>
              <tbody>
                {rules.violations.map((v, i) => (
                  <tr key={`violation_${i}`}>
                    <td>{v.rule}</td>
                    <td>{seperateLines(v.consequence)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <small>Updated {rules.updated}</small>
          </InfoDisplay>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <InfoDisplay title="Third-party software">
            <Card.Text>
              A non-exhaustive list of plugins and other third-party software.
              To be absolutely safe stick the the approved list or ask a staff
              member to update the list. Any software that is an addon or plugin
              will be listed as its Ashita name and any known Windower
              equivilent will be listed seperately.
            </Card.Text>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Software/Addon</th>
                  <th>Windower</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {software.list.map((s, i) => (
                  <tr key={`addon_${i}`}>
                    <td>{s.item}</td>
                    <td>
                      {s.windower || (
                        <small>
                          <i>n/a</i>
                        </small>
                      )}
                    </td>
                    <td>{s.allowed ? <b>Allowed</b> : <b>Disallowed</b>}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <small>Updated {software.updated}</small>
          </InfoDisplay>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <InfoDisplay title="Yell and Shout Rules">
            <ol>
              {yells.list.map((t, i) => (
                <li key={`term_${i}`}>{t}</li>
              ))}
            </ol>
            <small>Updated {yells.updated}</small>
          </InfoDisplay>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <InfoDisplay title="Bazaar Message and Search Comment Rules">
            <ol>
              {search.list.map((t, i) => (
                <li key={`term_${i}`}>{t}</li>
              ))}
            </ol>
            <small>Updated {search.updated}</small>
          </InfoDisplay>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <InfoDisplay title="Discord Rules">
            <Card.Text>
              These rules may be adjusted from time to time. It is the player's
              responsibility to keep up to date with the rules for the service
              they are using. It is at the moderators discretion if a player has
              crossed the line. If a Staff or Moderator asks a player to do
              something, that player needs to follow the request. If they feel
              this request is not appropriate, contact Rude or Juul with a of
              the request. If a player feels a staff member is talking talking
              inappropriately to another player, contact Rude or Juul with a
              screenshot of the inappropriate chat. Our moderators won't be able
              to see all rule violations--if a player happens to see breaking
              one of our rules or has crossed the line somewhere else, please
              let a moderator know in a private message with a screenshot of the
              chat that you feel broke the rule.
            </Card.Text>
            <ol>
              {discord.list.map((t, i) => (
                <li key={`term_${i}`}>{t}</li>
              ))}
            </ol>
            <small>Updated {discord.updated}</small>
          </InfoDisplay>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <InfoDisplay title="Remarks">
            <Card.Text>
              We want to promote a server that promotes teamwork first and
              foremost. Many of our development decisions including removing
              some quality of life enhancements are based on this tenant. We
              know some things can be annoying and time consuming but we feel
              like some of those things are unavoidable to provide a stronger
              feeling of community. Please report to the administration when you
              think there is something that we overlooked and would rather not
              have or rather have in the game.
            </Card.Text>
            <Card.Text>
              While not a rule, we would like to see stronger players
              encouraging and helping newer and weaker players in the form of:
              inviting them into your experience point parties, sharing
              non-secret information about monsters and drops, and more. When
              more people feel welcomed to this server we will all prosper.
            </Card.Text>
          </InfoDisplay>
        </Col>
      </Row>
    </>
  );
};

const ListWithUpdated = PropTypes.shape({
  updated: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.string),
});

Rules.propTypes = {
  list: PropTypes.shape({
    allowed: ListWithUpdated,
    disallowed: ListWithUpdated,
    discord: ListWithUpdated,
    rules: ListWithUpdated,
    terms: ListWithUpdated,
    yells: ListWithUpdated,
    search: ListWithUpdated,
  }).isRequired,
};

Rules.defaultProps = {
  allowed: {},
  disallowed: {},
  discord: {},
  rules: {},
  terms: {},
  yells: {},
  search: {},
};

export default Rules;
