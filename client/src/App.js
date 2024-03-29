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
import AddEducation from "./Components/Profile/AddEducation";
import AddExperience from "./Components/Profile/AddExperience";
import Profiles from "./Components/Profiles/Profiles";
import UserProfile from "./Components/UserProfile/UserProfile";
import Posts from "./Components/Posts/Posts";
import Post from "./Components/Post/Post";
// import Footer from "./Components/Layouts/Footer";

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
          <PrivateRoute
            path="/add-experience"
            exact
            component={AddExperience}
          />
          <PrivateRoute path="/add-education" exact component={AddEducation} />
          <PrivateRoute path="/edit-profile" exact component={EditProfile} />
          <PrivateRoute path="/post/:id" exact component={Post} />
          <PrivateRoute path="/posts" exact component={Posts} />

          <Route path="/profile/:id" exact component={UserProfile} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/profiles" exact component={Profiles} />
        </Switch>
      </section>
      {/* <Footer /> */}
    </Fragment>
  );
}

export default App;
