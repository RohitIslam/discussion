import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../store/actions/indexActions";
import Moment from "react-moment";

const EducationDashboard = props => {
  const educations = props.educations.map(education => (
    <tr key={education._id}>
      <td>{education.school}</td>
      <td className="hide-sm">{education.degree}</td>
      <td>
        <Moment format="YYYY-MM-DD">{education.from}</Moment> -{" "}
        {education.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY-MM-DD">{education.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => props.onDeleteEducation(education._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};
EducationDashboard.propTypes = {
  educations: PropTypes.array.isRequired,
  onDeleteEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteEducation: id => dispatch(actions.deleteEducation(id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EducationDashboard);
