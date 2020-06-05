import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Card, Container, Row, Col } from 'react-bootstrap';
import InfoDisplay from './InfoDisplay';

function install(props) {
  const { info } = props;

  return (
    <>
      <Row className="mb-3">
        <Col>
          <InfoDisplay title="Account Registration">
            <Card.Text>
              You&apos;ll need to follow one of the sections below to get Eden
              setup to play, but you will also need to register an account
              through the bootloader. Registration requires a 5-digit code that
              can be obtained from existing players who have accumulated 120
              hours (5 days) of playtime and main job is level 15 or greater.
              The easiest way to get a registration code is to join
              <a href={info.discord} rel="noopener noreferrer" target="_blank">
                our Discord
              </a>{' '}
              and then ask in the #new-players channel.
            </Card.Text>
          </InfoDisplay>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <InfoDisplay title="Fresh Install 64-bit systems" className="my-3">
            <Card.Text>
              First, you&apos;ll need to{' '}
              <a href={info.source1} rel="noopener noreferrer" target="_blank">
                download the Eden Installer v5.0
              </a>{' '}
              to connect to Eden. You do not need to install retail FFXI
              first—this install will take care of everything.
            </Card.Text>
            <Card.Text>
              The files included in this installer were downloaded directly from
              SquareEnix&apos;s freely distributed client. If the first link is
              full you can use the{' '}
              <a href={info.source2} rel="noopener noreferrer" target="_blank">
                alternative download.
              </a>
            </Card.Text>
          </InfoDisplay>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <InfoDisplay
            title="Coming back / migrating from another private server"
            className="mt-3"
          >
            <Card.Text>
              You will need to download{' '}
              <a
                href={info.bootloader}
                rel="noopener noreferrer"
                target="_blank"
              >
                our modified bootloader
              </a>
              . You may want to visit our tech-support channel on{' '}
              <a href={info.discord} rel="noopener noreferrer" target="_blank">
                our Discord server
              </a>{' '}
              if you&apos;re having trouble.
            </Card.Text>

            <ul>
              <li>
                You can run the bootloader by itself to play on Eden but I
                suggest to use Ashita.
              </li>

              <li>
                We do not officially support Windower, but you may find some
                help getting it set up in our tech-support channel.
              </li>

              <li>
                Move <b>edenxi.exe</b> to your Ashita <b>ffxi-bootmod</b>{' '}
                directory. The default folder for this is{' '}
                <b>~\\Program Files (x86)\PlayOnline\Ashita\ffxi-bootmod</b>
              </li>

              <li>
                DO NOT rename <b>edenxi.exe</b> or it will not work
              </li>

              <li>
                Open your Ashita configuration but right clicking a profile and
                then clicking &quot;Edit configuration&quot;
              </li>

              <li>
                In the File section you will see something like{' '}
                <b>.\\ffxi-bootmod\\pol.exe</b>. Ensure that this is changed to{' '}
                <b>.\\ffxi-bootmod\\edenxi.exe</b>
              </li>

              <li>
                Command should include <b>--server play.edenxi.com --hairpin</b>{' '}
                and may optionally include{' '}
                <b>--user MYUSERNAME --pass MYPASSWORD</b> arguments so that you
                can automatically login.
              </li>
            </ul>
          </InfoDisplay>
        </Col>
      </Row>
    </>
  );
}

install.propTypes = {
  info: PropTypes.shape({
    bootloader: PropTypes.string.isRequired,
    discord: PropTypes.string.isRequired,
    source1: PropTypes.string.isRequired,
    source2: PropTypes.string.isRequired,
  }),
};

// Is this dead code?  I see these values defined in config.js
install.defaultProps = {
  info: {
    bootloader: '',
    discord: '',
    source1: '',
    source2: '',
  },
};

export default install;
