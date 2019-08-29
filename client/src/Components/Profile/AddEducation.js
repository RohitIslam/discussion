import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../store/actions/indexActions";

const AddEducation = props => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    feildOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const [toDateDisabled, toggleDateDisabled] = useState(false);

  const {
    school,
    degree,
    feildOfStudy,
    from,
    to,
    current,
    description
  } = formData;

  const changeHandler = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const formSubmitHandler = event => {
    event.preventDefault();

    props.onAddEducation(formData, props.history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => formSubmitHandler(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={e => changeHandler(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={e => changeHandler(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            name="feildOfStudy"
            value={feildOfStudy}
            onChange={e => changeHandler(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => changeHandler(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={e => {
                setFormData({ ...formData, current: !current });
                toggleDateDisabled(!toDateDisabled);
              }}
            />{" "}
            Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={e => changeHandler(e)}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={e => changeHandler(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  onAddEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    onAddEducation: (formData, history) =>
      dispatch(actions.addEducation(formData, history))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(AddEducation));
