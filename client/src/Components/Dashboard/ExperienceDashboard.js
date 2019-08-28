import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/indexActions";
import Moment from "react-moment";

const ExperienceDashboard = props => {
  const experiences = props.experiences.map(experience => (
    <tr key={experience._id}>
      <td>{experience.company}</td>
      <td className="hide-sm">{experience.title}</td>
      <td>
        <Moment format="YYYY-MM-DD">{experience.from}</Moment> -{" "}
        {experience.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY-MM-DD">{experience.to}</Moment>
        )}
      </td>
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

ExperienceDashboard.propTypes = {
  experiences: PropTypes.array.isRequired
};

// const mapStateToProps = state => {
//   return {
//     auth: state.auth,
//     profile: state.profile
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onGetCurrentProfile: () => dispatch(actions.getCurrentProfile())
//   };
// };

export default connect()(ExperienceDashboard);