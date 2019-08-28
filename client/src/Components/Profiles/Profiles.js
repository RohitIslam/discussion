import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../store/actions/indexActions";
import Spinner from "../UI/Spinner/Spinner";
import ProfileItems from "./ProfileItems";

const Profiles = ({ onGetAllProfile, profile: { profiles, loading } }) => {
  useEffect(() => {
    onGetAllProfile();
  }, [onGetAllProfile]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItems key={profile._id} profile={profile} />
              ))
            ) : (
              <h4> No profiles found </h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  onGetAllProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetAllProfile: () => dispatch(actions.getAllProfiles())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profiles);
