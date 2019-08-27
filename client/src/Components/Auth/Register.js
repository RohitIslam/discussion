import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../store/actions/indexActions";

const Register = props => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const changeHandler = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    if (password !== password2) {
      props.onSetAlert("Password do not match", "danger");
    } else {
      const newUser = {
        name,
        email,
        password
      };

      props.onRegistrationSubmit(newUser);
    }
  };

  return (
    <React.Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={e => formSubmitHandler(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => changeHandler(e)}
            required
          />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={changeHandler}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </React.Fragment>
  );
};

Register.propTypes = {
  onSetAlert: PropTypes.func.isRequired,
  onRegistrationSubmit: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    onSetAlert: (msg, alertType) => dispatch(actions.setAlert(msg, alertType)),
    onRegistrationSubmit: userData => dispatch(actions.register(userData))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Register);
