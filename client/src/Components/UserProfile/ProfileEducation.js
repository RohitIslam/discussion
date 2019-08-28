import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({ education }) => {
  return (
    <div>
      <h3 className="text-dark">{education.school}</h3>
      <p>
        <Moment format="YYYY-MM-DD">{education.from}</Moment> -{" "}
        {education.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY-MM-DD">{education.to}</Moment>
        )}
      </p>
      <p>
        <strong>Degree: </strong>
        {education.degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {education.feildOfStudy}
      </p>
      <p>
        <strong>Description: </strong>
        {education.description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
};

export default ProfileEducation;
