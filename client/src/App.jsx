import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as api from './api';

import LandingPage from './components/page';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      profile: {
        emailModalOpen: false,
        passwordModalOpen: false,
        updatedEmail: '',
        updatedPassword: '',
      },
      config: {},
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
      .catch(error => this.handleErrorOnGetConfig(error.response));
  }

  handleErrorOnGetConfig(error) {
    this.setState({ config: {}, ready: true });
  }

  render() {
    const { ready, config } = this.state;

    return (
      <>
        {ready && (
          <Router>
            <LandingPage config={config} />
          </Router>
        )}
      </>
    );
  }
}

export default App;
