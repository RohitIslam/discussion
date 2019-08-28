import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as actions from "../../store/actions/indexActions";
import Spinner from "../UI/Spinner/Spinner";
import ManageProfileOptions from "../Profile/ManageProfileOptions";
import ExperienceDashboard from "./ExperienceDashboard";
import EducationDashboard from "./EducationDashboard";

const Dashboard = ({ onGetCurrentProfile, auth, profile }) => {
  useEffect(() => {
    onGetCurrentProfile();
  }, []);

  return profile.loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {auth.user && auth.user.name}
      </p>
      {profile.profile !== null ? (
        <Fragment>
          <ManageProfileOptions />
          <ExperienceDashboard experiences={profile.profile.experience} />
          <EducationDashboard educations={profile.profile.education} />
        </Fragment>
      ) : (
        <Fragment>
          <p>Please setup your profile !!</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  onGetCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCurrentProfile: () => dispatch(actions.getCurrentProfile())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
