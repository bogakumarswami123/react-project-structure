import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import store from "../utils/store";

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;
