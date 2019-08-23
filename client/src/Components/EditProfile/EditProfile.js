import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import * as actions from "../../store/actions/indexActions";
import CustomInput from "../UI/Input/CustomInput";
import CustomSelectList from "../UI/SelectList/CustomSelectList";
import CustomTextAreaField from "../UI/TextArea/CustomTextAreaField";
import CustomIconInput from "../UI/IconInput/CustomIconInput";
import isEmptyValidation from "../../Validation/isEmptyValidation";

class EditProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    gitHubUserName: "",
    bio: "",
    twitter: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    instagram: "",
    errors: {}
  };

  componentDidMount() {
    this.props.onCurrentProfile();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return { errors: nextProps.errors }; // assigning this.props.errors to this.state.errors object
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      //bring skill array bact to comma separator value(CSV)
      const skillsCSV = profile.skills.join(",");

      //check if profile feilds doesn't exist
      profile.company = !isEmptyValidation(profile.company)
        ? profile.company
        : "";
      profile.website = !isEmptyValidation(profile.website)
        ? profile.website
        : "";
      profile.location = !isEmptyValidation(profile.location)
        ? profile.location
        : "";
      profile.gitHubUserName = !isEmptyValidation(profile.gitHubUserName)
        ? profile.gitHubUserName
        : "";
      profile.bio = !isEmptyValidation(profile.bio) ? profile.bio : "";
      profile.social = !isEmptyValidation(profile.social) ? profile.social : {};
      profile.twitter = !isEmptyValidation(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmptyValidation(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.youtube = !isEmptyValidation(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.linkedin = !isEmptyValidation(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.instagram = !isEmptyValidation(profile.social.instagram)
        ? profile.social.instagram
        : "";

      // Set to state

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        gitHubUserName: profile.gitHubUserName,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        youtube: profile.youtube,
        linkedin: profile.linkedin,
        instagram: profile.instagram
      });
    }
    return null;
  }

  changeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  formSubmitHandler = event => {
    event.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      gitHubUserName: this.state.gitHubUserName,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram
    };

    this.props.onCreateProfileSubmit(profileData, this.props.history);
  };

  render() {
    const { errors, displaySocialInputs } = this.state;

    //Social Inputs
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <CustomIconInput
            placeholder="Twitter Profile URL"
            type="text"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.changeHandler}
            errors={errors.twitter}
          />
          <CustomIconInput
            placeholder="Facebook Page URL"
            type="text"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.changeHandler}
            errors={errors.facebook}
          />
          <CustomIconInput
            placeholder="Linkedin Profile URL"
            type="text"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.changeHandler}
            errors={errors.linkedin}
          />
          <CustomIconInput
            placeholder="YouTube Channel URL"
            type="text"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.changeHandler}
            errors={errors.youtube}
          />
          <CustomIconInput
            placeholder="Instagram Page URL"
            type="text"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.changeHandler}
            errors={errors.instagram}
          />
        </div>
      );
    }

    //Select options for status
    const options = [
      { label: "* Select Professional Status", value: 0, key: 0 },
      { label: "Developer", value: "Developer", key: "Developer" },
      {
        label: "Junior Developer",
        value: "Junior Developer",
        key: "Junior Developer"
      },
      {
        label: "Senior Developer",
        value: "Senior Developer",
        key: "Senior Developer"
      },
      { label: "Manager", value: "Manager", key: "Manager" },
      {
        label: "Student or Learning",
        value: "Student or Learning",
        key: "Student or Learning"
      },
      { label: "Instructor", value: "Instructor", key: "Instructor" },
      { label: "Intern", value: "Intern", key: "Intern" },
      { label: "Other", value: "Other", key: "Other" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required field</small>
              <form noValidate onSubmit={this.formSubmitHandler}>
                <CustomInput
                  type="text"
                  placeholder="* Profile handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.changeHandler}
                  errors={errors.handle}
                  info="A unique handle for your profile URL. Your full name,
                    company name, nickname, etc"
                />
                <CustomSelectList
                  name="status"
                  value={this.state.status}
                  onChange={this.changeHandler}
                  options={options}
                  errors={errors.status}
                  info="Give us an idea of where you are at in your career"
                />
                <CustomInput
                  type="text"
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.changeHandler}
                  errors={errors.company}
                  info="Could be your own company or one you work for"
                />
                <CustomInput
                  type="text"
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.changeHandler}
                  errors={errors.website}
                  info="Could be your own or a company website"
                />
                <CustomInput
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.changeHandler}
                  errors={errors.location}
                  info="City & state suggested (eg. Boston, MA)"
                />
                <CustomInput
                  type="text"
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.changeHandler}
                  errors={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)"
                />
                <CustomInput
                  type="text"
                  placeholder="Github Username"
                  name="gitHubUserName"
                  value={this.state.gitHubUserName}
                  onChange={this.changeHandler}
                  errors={errors.gitHubUserName}
                  info="If you want your latest repos and a Github link, include
                    your username"
                />
                <CustomTextAreaField
                  placeholder="A short bio of yourself"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.changeHandler}
                  errors={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
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
    onCurrentProfile: () => dispatch(actions.getCurrentProfile()),
    onCreateProfileSubmit: (profileData, history) =>
      dispatch(actions.createProfile(profileData, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
