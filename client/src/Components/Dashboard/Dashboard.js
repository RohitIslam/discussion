import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/indexActions";
import Spinner from "../UI/Spinner/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.onCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check if logged in user have profile data or not
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h1> hi</h1>;
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name} </p>
            <p>You have to setup your profile</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4"> Dashboard</h1>
              {dashboardContent}
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
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCurrentProfile: () => dispatch(actions.getCurrentProfile())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
