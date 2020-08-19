import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Routes from "./Routes";
import UserContext, { UserProvider } from "../contexts/UserContext";
import ScrollTop from "../shared/components/ScrollTop";

class ConnectedComponent extends React.PureComponent {
  // eslint-disable-next-line
  static contextType = UserContext;

  componentDidMount() {
    const { onBootstrap } = this.context;
    onBootstrap();
  }

  render() {
    return (
      <div>
        <div id="main" role="main">
          <div>
            <Routes />
          </div>
        </div>
      </div>
    );
  }
}

const App = () => (
  <UserProvider>
    <Router>
      <ScrollTop>
        <Route component={ConnectedComponent} />
      </ScrollTop>
    </Router>
  </UserProvider>
);

export default App;
