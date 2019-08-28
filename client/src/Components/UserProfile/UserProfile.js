import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/indexActions";
import Spinner from "../UI/Spinner/Spinner";
import ProfileTop from "./ProfileTop";

const UserProfile = ({
  match,
  onGetProfileById,
  profile: { profile, loading },
  auth
}) => {
  useEffect(() => {
    onGetProfileById(match.params.id);
  }, [onGetProfileById, match.params.id]);

  return (
    <Fragment>
      {profile == null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-primary"></i> Edit Profile
              </Link>
            )}
          <div class="profile-grid my-1">
            <ProfileTop profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

UserProfile.propTypes = {
  onGetProfileById: PropTypes.func.isRequired,
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
    onGetProfileById: user_id => dispatch(actions.getProfileByUserId(user_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
