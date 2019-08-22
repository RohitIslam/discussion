import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";

import setAuthToken from "./store/utils/setAuthToken";
import * as actions from "./store/actions/indexActions";

import "./index.css";
import App from "./App";
import store from "./store/store";
import * as serviceWorker from "./serviceWorker";

//check for token
if (localStorage.jwtToken) {
  //set auth token to header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token to ger user data
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set current user
  store.dispatch(actions.setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    //Logout user
    store.dispatch(actions.logout(decoded));

    // Redirected to login
    window.location.href = '/login';
  }
}

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
