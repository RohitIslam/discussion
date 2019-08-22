import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/indexActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.onCurrentProfile();
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile,
    errors: state.errors
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
