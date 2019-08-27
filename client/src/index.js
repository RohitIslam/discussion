import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import setAuthToken from "./store/utils/setAuthTokenUtil";
import * as actions from "./store/actions/indexActions";

// set stored token to the header
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

//Check for token validation and Set current user to the state
store.dispatch(actions.userLoaded());

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
