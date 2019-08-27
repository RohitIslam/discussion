import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Navbar from "./Components/Layouts/Navbar";
import Landing from "./Components/Layouts/Landing";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Alert from "./Components/Layouts/Alert";
import Dashboard from "./Components/Dashboard/Dashboard";
import PrivateRoute from "./store/utils/PrivateRoute/PrivateRoute";
import CreateProfile from "./Components/Profile/CreateProfile";
import EditProfile from "./Components/Profile/EditProfile";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Route path="/" exact component={Landing} />
      <section className="container">
        <Alert />
        <Switch>
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <PrivateRoute
            path="/create-profile"
            exact
            component={CreateProfile}
          />
          <PrivateRoute path="/edit-profile" exact component={EditProfile} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </section>
    </Fragment>
  );
}

export default App;
