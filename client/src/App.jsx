import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faDesktop, faWrench, faLink, faGavel, faInfoCircle, faHome, faAdjust } from '@fortawesome/free-solid-svg-icons';
import * as api from './api';
import theme from './themeUtil';

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

  handleErrorOnGetConfig() {
    this.setState({ config: {}, ready: true });
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

  setContext(updatedContext) {
    this.setState(state => {
      return { ...state, ...updatedContext };
    });
  }

  render() {
    theme.update();
    const { ready, config, apiNoResponse } = this.state;
    const links = [
      {
        key: 'site-link-home',
        type: 'link',
        to: '/',
        text: 'Home',
        icon: <FontAwesomeIcon icon={faHome} />,
      },
      {
        key: 'site-link-news',
        type: 'link',
        to: '/posts',
        text: 'Posts',
        icon: <FontAwesomeIcon icon={faNewspaper} />,
      },
      {
        key: 'site-link-install',
        type: 'link',
        to: '/install',
        text: 'Install',
        icon: <FontAwesomeIcon icon={faDesktop} />,
      },
      {
        key: 'site-link-tools',
        type: 'link',
        to: '/tools',
        text: 'Tools',
        icon: <FontAwesomeIcon icon={faWrench} />,
      },
      {
        key: 'site-link-links',
        type: 'link',
        to: '/links',
        text: 'Links',
        icon: <FontAwesomeIcon icon={faLink} />,
      },
      {
        key: 'site-links-rules',
        type: 'link',
        to: '/rules',
        text: 'Rules',
        icon: <FontAwesomeIcon icon={faGavel} />,
      },
      {
        key: 'site-links-about',
        type: 'link',
        to: '/about',
        text: 'About',
        icon: <FontAwesomeIcon icon={faInfoCircle} />,
      },
      {
        key: 'site-links-darkmode',
        type: 'function',
        to: '/',
        text: '',
        icon: <FontAwesomeIcon icon={faAdjust} />,
        func: theme.change,
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
            <span>Website tools are currently down. Please check again later.</span>
          </div>
        )}
        <div className="gm_content my-3">{ready && <LandingPage config={config} apiNoResponse={apiNoResponse} className="h-100" />}</div>
        <SiteFooter className="mt-5" />
      </div>
    );
  }
}

export default App;
