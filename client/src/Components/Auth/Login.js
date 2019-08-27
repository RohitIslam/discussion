import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../store/actions/indexActions";

const Login = props => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const changeHandler = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const formSubmitHandler = event => {
    event.preventDefault();

    const userData = {
      email,
      password
    };

    props.onLoginSubmit(userData);
  };

  return (
    <React.Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" onSubmit={e => formSubmitHandler(e)} noValidate>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={changeHandler}
            name="email"
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={changeHandler}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </React.Fragment>
  );
};

Login.propTypes = {
  onSetAlert: PropTypes.func.isRequired,
  onLoginSubmit: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    onSetAlert: (msg, alertType) => dispatch(actions.setAlert(msg, alertType)),
    onLoginSubmit: userData => dispatch(actions.login(userData))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
