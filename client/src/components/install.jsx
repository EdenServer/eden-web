import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Container, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function install(props) {
  const { info } = props;

  return (
    <Segment className="gm_install">
      <Container textAlign="justified">
        <h3>Account Registration</h3>
        <p>
          You&apos;ll need to follow one of the sections below to get Eden setup
          to play. But you&apos;ll also need to register an account on the
          website. You can do that via the{' '}
          <Link to="/tools?user=register">tools page</Link>.
        </p>
        <Divider />
        <h3>Fresh Install 64-bit systems</h3>
        <p>
          First, you&apos;ll need to{' '}
          <a href={info.source1} rel="noopener noreferrer" target="_blank">
            download the Eden Installer v4.1
          </a>{' '}
          to connect to Eden. You do not need to install retail FFXI first—this
          install will take care of everything.
        </p>
        <p>
          The files included in this installer were downloaded directly from
          SquareEnix&apos;s freely distributed client. If the first link is full
          you can use the{' '}
          <a href={info.source2} rel="noopener noreferrer" target="_blank">
            alternative download.
          </a>
        </p>
        <Divider />
        <h3>Coming back / migrating from another private server</h3>
        <p>
          You will need to download{' '}
          <a href={info.bootloader} rel="noopener noreferrer" target="_blank">
            our modified bootloader
          </a>
          . You may want to visit our tech-support channel on{' '}
          <a href={info.discord} rel="noopener noreferrer" target="_blank">
            our Discord server
          </a>{' '}
          if you&apos;re having trouble.
        </p>
        <ul>
          <li>
            You can run the bootloader by itself to play on Eden but I suggest
            to use Ashita.
          </li>
          <li>
            We do not officially support Windower, but you may find some help
            getting it set up in our tech-support channel.
          </li>
          <li>
            Move <b>edenxi.exe</b> to your Ashita <b>ffxi-bootmod</b> directory.
            The default folder for this is{' '}
            <b>~\\Program Files (x86)\PlayOnline\Ashita\ffxi-bootmod</b>
          </li>
          <li>
            DO NOT rename <b>edenxi.exe</b> or it will not work
          </li>
          <li>
            Open your Ashita configuration but right clicking a profile and then
            clicking &quot;Edit configuration&quot;
          </li>
          <li>
            In the File section you will see something like{' '}
            <b>.\\ffxi-bootmod\\pol.exe</b>. Ensure that this is changed to{' '}
            <b>.\\ffxi-bootmod\\edenxi.exe</b>
          </li>
          <li>
            Command should include <b>--server play.edenxi.com --hairpin</b> and
            may optionally include <b>--user MYUSERNAME --pass MYPASSWORD</b>{' '}
            arguments so that you can automatically login.
          </li>
        </ul>
      </Container>
    </Segment>
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
