import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Navbar from "./Components/Layouts/Navbar";
import Footer from "./Components/Layouts/Footer";
import Landing from "./Components/Layouts/Landing";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Dashboard from "./Components/Dashboard/Dashboard";
import PrivateRoute from "./store/utils/PrivateRoute/PrivateRoute";
import CreateProfile from "./Components/CreateProfile/CreateProfile";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <PrivateRoute
            path="/create-profile"
            exact
            component={CreateProfile}
          />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <Route path="/" exact component={Landing} />
        </Switch>
        <div className="container">
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
