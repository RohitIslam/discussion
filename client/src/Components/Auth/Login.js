import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

import * as actions from "../../store/actions/indexActions";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return { errors: nextProps.errors }; // assigning this.props.errors to this.state.errors object
    }
    return null;
  }

  componentDidUpdate() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  changeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  formSubmitHandler = event => {
    event.preventDefault();

    const userInfo = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.onLoginSubmit(userInfo);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form noValidate onSubmit={this.formSubmitHandler}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.changeHandler}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.changeHandler}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginSubmit: userInfo => dispatch(actions.login(userInfo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
