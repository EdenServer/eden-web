import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Card, Container, Row, Col } from 'react-bootstrap';
import InfoDisplay from './InfoDisplay';

function install(props) {
  const { info } = props;

  return (
    <>
      <Row className="my-3">
        <Col>
          <InfoDisplay title="Fresh Install 64-bit systems" className="my-3">
            <Card.Text>
              First, you&apos;ll need to&nbsp;
              <a href={info.source1} rel="noopener noreferrer" target="_blank">
                download the Eden Installer
              </a>
              &nbsp; to connect to Eden. You do not need to install retail FFXI first—this install will take care of everything.
            </Card.Text>
            <Card.Text>
              The files included in this installer were downloaded directly from SQUARE ENIX CO., LTD&apos;s freely distributed client. If the first link is
              full you can use the&nbsp;
              <a href={info.source2} rel="noopener noreferrer" target="_blank">
                alternative download
              </a>
              . After setup completes, verify that <b>--server play.edenxi.com --hairpin</b> appears in your Ashita profile, and then move to the Account
              Registration section below.
            </Card.Text>
          </InfoDisplay>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <InfoDisplay title="Account Registration">
            <Card.Text>
              The bootloader (black login screen) supports registering an account. If you are prompted for a registration code, one can be obtained from players
              who have accumulated 120 hours (5 days) of playtime and whose current job is level 15 or greater. Make sure you have Eden completely installed
              before requesting one. The easiest way to get a registration code is to join&nbsp;
              <a href={info.discord} rel="noopener noreferrer" target="_blank">
                our Discord
              </a>
              &nbsp; and request a code in the #new-players channel.
            </Card.Text>
          </InfoDisplay>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <InfoDisplay title="Coming back from another private server" className="mt-3">
            <Card.Text>
              You will need to download&nbsp;
              <a href={info.bootloader} rel="noopener noreferrer" target="_blank">
                our modified bootloader&nbsp;.
              </a>
              You may want to visit our tech-support channel on&nbsp;
              <a href={info.discord} rel="noopener noreferrer" target="_blank">
                our Discord server
              </a>
              &nbsp; if you're having trouble.
            </Card.Text>

            <ul>
              <li>You can run the bootloader by itself to play on Eden, but suggested use is with Ashita.</li>

              <li>We do not officially support Windower, but you may find some help getting it set up in our tech-support Discord channel.</li>

              <li>
                Move <b>xiloader.exe</b> to your Ashita <b>ffxi-bootmod</b>&nbsp; directory. The default folder for this is&nbsp;
                <b>~\\Program Files (x86)\PlayOnline\Ashita\ffxi-bootmod</b>
              </li>

              <li>Open your Ashita configuration, by right-clicking a profile and then clicking &quot;Edit configuration&quot;.</li>

              <li>
                In the File section you may see something like&nbsp;
                <b>.\\ffxi-bootmod\\pol.exe</b>. Ensure that this is changed to&nbsp;
                <b>.\\ffxi-bootmod\\xiloader.exe</b>
              </li>

              <li>
                Command should include <b>--server play.edenxi.com --hairpin</b>
                &nbsp; and may optionally include&nbsp;
                <b>--user MYUSERNAME --pass MYPASSWORD</b> arguments so that you can automatically login.
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

install.defaultProps = {
  info: {
    bootloader: '',
    discord: '',
    source1: '',
    source2: '',
  },
};

export default install;
