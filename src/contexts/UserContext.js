import React from "react";

import { connect } from "react-redux";
import storage, { USER_STORAGE_KEY } from "../utils/localStorage";
import UsersService from "../services/UserServices";
import cookie, { COOKIE_KEY_REFRESH_TOKEN } from "../utils/cookie";
// import USERS from '../fixtures/users.json';
// import {USER_ROLES} from "../constants/userRoles";
// import { connect } from 'react-redux';
// import { request } from "../redux/actions/request";

const UserContext = React.createContext();
const { Provider, Consumer } = UserContext;

const initialUser = {
  identities: {},
};

class UserProvider extends React.Component {
  constructor(props) {
    super(props);

    this.storageKey = USER_STORAGE_KEY;

    // const { request } = this.props;
    this.userApi = UsersService;
    // this.userApi.request = request;

    this.state = {
      onLogin: this.handleLogin,
      bootstrap: false,
      token: undefined,
      type: null,
      user: initialUser,
      isLoggedIn: this.isLoggedIn,
      isBootstrapped: this.isBootstrapped,
      onBootstrap: this.handleBootstrap,
      // onRegister: this.handleRegister,
      onLogout: this.handleLogout,
    };
  }

  isLoggedIn = () => {
    return !!this.state.token;
  };

  handleLogin = async (user, actions) => {
    try {
      const result = await this.userApi.signIn(user);
      if (result) {
        this.storeUser(result.data.custom_user, result.data.token.access);
        cookie.setCookie(COOKIE_KEY_REFRESH_TOKEN, result.data.token.refresh);
      }
      actions.setSubmitting(false);
    } catch (e) {
      // eslint-disable-no-console
      console.log("Login error: ", e);
    }
  };

  storeUser = (user, token) => {
    cookie.setToken(token);
    storage.setItem(this.storageKey, user);

    this.setState(() => ({
      token,
      user: {
        ...user,
      },
    }));
  };

  isBootstrapped = () => {
    const { bootstrap } = this.state;
    return !!bootstrap;
  };

  handleBootstrap = () => {
    if (cookie.hasToken()) {
      this.setState(() => ({
        token: cookie.getToken(),
      }));
    }

    const user = storage.getItem(this.storageKey);

    this.setState(() => ({
      bootstrap: true,
      user: {
        ...user,
      },
    }));
  };

  handleLogout = () => {
    this.userApi.logout().finally(() => {
      cookie.removeToken();
      cookie.removeCookie(COOKIE_KEY_REFRESH_TOKEN);
      storage.removeItem(this.storageKey);
      this.setState({
        token: undefined,
        user: initialUser,
      });
    });
  };

  render() {
    const { children } = this.props;
    return <Provider value={this.state}>{children}</Provider>;
  }
}

function withUser(Component) {
  return function ConnectedComponent(props) {
    return (
      <UserContext.Consumer>
        {(user) => <Component {...props} userStore={user} />}
      </UserContext.Consumer>
    );
  };
}

const mapStateToProps = (state) => state;
const connectedUserProvider = connect(mapStateToProps)(UserProvider);

export {
  connectedUserProvider as UserProvider,
  Consumer as UserConsumer,
  withUser,
};
export default UserContext;
