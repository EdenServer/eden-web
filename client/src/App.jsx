import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as api from './api';

import LandingPage from './components/page';

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

    return (
      <>
        {ready && (
          <Router>
            <LandingPage config={config} apiNoResponse={apiNoResponse} />
          </Router>
        )}
      </>
    );
  }
}

export default App;
