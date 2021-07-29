import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNewspaper,
  faDesktop,
  faWrench,
  faLink,
  faGavel,
  faInfoCircle,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import * as api from './api';

import LandingPage from './components/page';
import SiteNavbar from './components/SiteNavbar/SiteNavbar';
import SiteFooter from './components/SiteFooter/SiteFooter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      apiNoResponse: false,
      profile: {
        emailModalOpen: false,
        passwordModalOpen: false,
        updatedEmail: '',
        updatedPassword: '',
      },
      config: { install: {}, links: [], posts: [], rules: {} },
    };

    this.setContext = this.setContext.bind(this);
  }

  async componentDidMount() {
    await this.getConfig();
  }

  setContext(updatedContext) {
    this.setState(state => {
      return { ...state, ...updatedContext };
    });
  }

  setConfig(config) {
    this.setState({ config, ready: true });
  }

  async getConfig() {
    await api
      .getConfig()
      .then(response => this.setConfig(response.data))
      .catch(() => this.handleErrorOnGetConfig());
  }

  handleErrorOnGetConfig() {
    this.setState({ config: {}, ready: true });
  }

  render() {
    const { ready, config, apiNoResponse } = this.state;
    const links = [
      {
        key: 'site-link-home',
        to: '/',
        text: 'Home',
        icon: <FontAwesomeIcon icon={faHome} />,
      },
      {
        key: 'site-link-news',
        to: '/posts',
        text: 'Posts',
        icon: <FontAwesomeIcon icon={faNewspaper} />,
      },
      {
        key: 'site-link-install',
        to: '/install',
        text: 'Install',
        icon: <FontAwesomeIcon icon={faDesktop} />,
      },
      {
        key: 'site-link-tools',
        to: '/tools',
        text: 'Tools',
        icon: <FontAwesomeIcon icon={faWrench} />,
      },
      {
        key: 'site-link-links',
        to: '/links',
        text: 'Links',
        icon: <FontAwesomeIcon icon={faLink} />,
      },
      {
        key: 'site-links-rules',
        to: '/rules',
        text: 'Rules',
        icon: <FontAwesomeIcon icon={faGavel} />,
      },
      {
        key: 'site-links-about',
        to: '/about',
        text: 'About',
        icon: <FontAwesomeIcon icon={faInfoCircle} />,
      },
      // {
      //   key: 'site-links-contact',
      //   to: '/contact',
      //   text: 'Contact',
      //   icon: <FontAwesomeIcon icon={faPhone} />,
      // },
    ];

    return (
      <div className="gm_main h-100">
        <SiteNavbar links={links} />
        {config && Object.keys(config).length === 0 && (
          <div className="alert alert-warning m-0 text-center">
            <span>
              Website tools are currently down. Please check again later.
            </span>
          </div>
        )}
        <div className="gm_content my-3">
          {ready && (
            <LandingPage
              config={config}
              apiNoResponse={apiNoResponse}
              className="h-100"
            />
          )}
        </div>
        <SiteFooter className="mt-5" />
      </div>
    );
  }
}

export default App;
