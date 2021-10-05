import React from 'react';
import { createHistory } from '@reach/router';
import Login from './login';
import Register from './register';
import Profile from './profile';
import apiUtil from '../../apiUtil';

// eslint-disable-next-line no-useless-escape
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Account extends React.Component {
  constructor(props) {
    super(props);
    const history = createHistory(window);
    const params = new URLSearchParams(history.location.search);

    this.state = {
      profile: {},
      signup: params.get('user') === 'register',
      error: {},
      verify: null,
      loading: true,
    };

    this.fetchProfile = this.fetchProfile.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.verify = this.verify.bind(this);
    this.register = this.register.bind(this);
    this.changePage = this.changePage.bind(this);
    this.recaptcha = null;
  }

  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      apiUtil.get({ url: '/api/v1/accounts/profile' }, (error, res) => {
        if (error) {
          this.setState({ loading: false });
        } else if (res.status === 200) {
          res.json().then(data => {
            localStorage.setItem('jwt', data.jwt);
            this.setState({ profile: data.profile, loading: false });
          });
        } else {
          this.setState({ loading: false });
        }
      });
    } else {
      this.setState({ loading: false });
    }
  }

  login(username, password) {
    apiUtil.post(
      {
        url: '/api/v1/accounts/login',
        headers: {
          user: username,
          pass: password,
        },
      },
      (error, res) => {
        if (error) {
          this.setState({ error: { server: 'Invalid username or password.' } });
        } else if (res.status === 200) {
          res
            .text()
            .then(data => {
              localStorage.setItem('jwt', data);
              this.setState({ error: {} });
              this.fetchProfile();
            })
            .catch(err => {
              this.setState({
                error: { server: 'Invalid username or password.' },
              });
            });
        } else {
          this.setState({ error: { server: 'Invalid username or password.' } });
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('jwt');
    this.setState({ profile: {}, signup: false, error: false });
  }

  verify(key) {
    this.setState({ verify: key });
  }

  register(inputGroup) {
    const info = { verify: this.state.verify };
    const errors = {};

    // cycle through each of the inputs and output a map
    Object.entries(inputGroup).forEach(input => {
      info[input[0]] = input[1].value;
    });

    if (info.username.length < 6 || info.username.length > 15) {
      errors.username = 'Your username should have between 6 and 15 characters.';
    } else {
      delete errors.username;
    }
    if (info.username !== info.confirmUsername) {
      errors.confirmUsername = "Your username doesn't match up here.";
    } else {
      delete errors.confirmUsername;
    }
    if (info.password.length < 6) {
      errors.password = 'Your password should have between 6 and 15 characters.';
    } else {
      delete errors.password;
    }
    if (info.password !== info.confirmPassword) {
      errors.confirmPassword = "Your password doesn't match up here.";
    } else {
      delete errors.confirmPassword;
    }
    if (!emailRegex.test(info.email)) {
      errors.email = 'Please enter a valid email. This is used to recover your account if lost.';
    } else {
      delete errors.email;
    }
    if (info.email !== info.confirmEmail) {
      errors.confirmEmail = "Your email doesn't match up here.";
    } else {
      delete errors.confirmEmail;
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ error: errors });
    } else {
      apiUtil.post(
        {
          url: '/api/v1/accounts/register',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: info,
          json: true,
        },
        (error, data) => {
          if (data.status === 'SUCCESS') {
            this.login(info.username, info.password);
            this.setState({ error: false, signup: false });
          } else {
            this.setState({ error: data.errors });
          }
        }
      );
    }
  }

  changePage() {
    this.setState(state => ({ signup: !state.signup, error: {} }));
  }

  render() {
    const { error, profile, loading, signup, verify } = this.state;
    const authorized = !!profile.id;

    if (loading) {
      return null;
    }

    if (!authorized) {
      if (signup) {
        return <Register register={this.register} error={error} changePage={this.changePage} verify={this.verify} verified={verify} />;
      }
      return <Login login={this.login} error={Object.keys(error).length > 0} changePage={this.changePage} />;
    }

    return <Profile reload={this.fetchProfile} user={profile} logout={this.logout} />;
  }
}

export default Account;
