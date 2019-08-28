import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import * as actions from "../../store/actions/indexActions";

const EditProfile = props => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    bio: "",
    status: "",
    skills: "",
    githubUserName: "",
    youtube: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    instagram: ""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    props.onGetCurrentProfile();

    setFormData({
      company:
        props.profile.loading || !props.profile.profile.company
          ? ""
          : props.profile.profile.company,
      website:
        props.profile.loading || !props.profile.profile.website
          ? ""
          : props.profile.profile.website,
      location:
        props.profile.loading || !props.profile.profile.location
          ? ""
          : props.profile.profile.location,
      bio:
        props.profile.loading || !props.profile.profile.bio
          ? ""
          : props.profile.profile.bio,
      status:
        props.profile.loading || !props.profile.profile.status
          ? ""
          : props.profile.profile.status,
      skills:
        props.profile.loading || !props.profile.profile.skills
          ? ""
          : props.profile.profile.skills.join(","),
      githubUserName:
        props.profile.loading || !props.profile.profile.githubUserName
          ? ""
          : props.profile.profile.githubUserName,
      youtube:
        props.profile.loading || !props.profile.profile.social
          ? ""
          : props.profile.profile.social.youtube,
      facebook:
        props.profile.loading || !props.profile.profile.social
          ? ""
          : props.profile.profile.social.facebook,
      linkedin:
        props.profile.loading || !props.profile.profile.social
          ? ""
          : props.profile.profile.social.linkedin,
      twitter:
        props.profile.loading || !props.profile.profile.social
          ? ""
          : props.profile.profile.social.twitter,
      instagram:
        props.profile.loading || !props.profile.profile.social
          ? ""
          : props.profile.profile.social.instagram
    });
  }, [props.profile.loading]); // when loading is true that's when useEffect will run

  const {
    company,
    website,
    location,
    bio,
    status,
    skills,
    githubUserName,
    youtube,
    facebook,
    linkedin,
    twitter,
    instagram
  } = formData;

  const changeHandler = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const formSubmitHandler = event => {
    event.preventDefault();

    props.onCreateProfile(formData, props.history, true);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => formSubmitHandler(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e => changeHandler(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={e => changeHandler(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={e => changeHandler(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => changeHandler(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Dhaka, Bangladesh)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={e => changeHandler(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubUserName}
            onChange={e => changeHandler(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => changeHandler(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={e => changeHandler(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={e => changeHandler(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={e => changeHandler(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={e => changeHandler(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={e => changeHandler(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  onCreateProfile: PropTypes.func.isRequired,
  onGetCurrentProfile: PropTypes.func.isRequired,
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
    onCreateProfile: (userData, history, edit) =>
      dispatch(actions.createProfile(userData, history, edit)),
    onGetCurrentProfile: () => dispatch(actions.getCurrentProfile())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
