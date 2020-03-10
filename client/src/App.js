import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import LandingPage from './components/page';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        emailModalOpen: false,
        passwordModalOpen: false,
        updatedEmail: '',
        updatedPassword: '',
      },
      config: null,
    };

    this.setContext = this.setContext.bind(this);
  }

  componentWillMount() {
    fetch('/api/v1/misc/config')
      .then(response => response.json()).then(config => this.setState({ config }))
      .catch(err => console.error(err));
  }

  setContext(updatedContext) {
    this.setState((state) => {
      return Object.assign({}, state, updatedContext);
    });
  }

  render() {
    if (!this.state.config) return null;

    return (
      <Router>
        <LandingPage config={this.state.config} />
      </Router>
    );
  }
}

export default App;
