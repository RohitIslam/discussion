import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
        <button
          className="btn btn-danger"
          onClick={() => props.onDeleteExperience(experience._id)}
        >
          Delete
        </button>
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
  experiences: PropTypes.array.isRequired,
  onDeleteExperience: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteExperience: id => dispatch(actions.deleteExperience(id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ExperienceDashboard);
