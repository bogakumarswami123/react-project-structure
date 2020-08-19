import React from "react";
import "./signUp.css";
import UserContext from "../../contexts/UserContext";

export default class SignUp extends React.PureComponent {
  // eslint-disable-next-line
  static contextType = UserContext;

  componentDidMount() {
    const { onLogout } = this.context;
    onLogout();
  }

  render() {
    return <div>Sign Up component</div>;
  }
}
