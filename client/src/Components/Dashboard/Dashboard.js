import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../store/actions/indexActions";

const Dashboard = props => {
  useEffect(() => {
    props.onGetCurrentProfile();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
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
