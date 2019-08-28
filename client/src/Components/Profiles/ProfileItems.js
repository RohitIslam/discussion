import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItems = ({ profile }) => {
  return (
    <div className="profile bg-light">
      <img className="round-img" src={profile.user.avatar} alt="Avatar" />
      <div>
        <h2>{profile.user.name}</h2>
        <p>
          {profile.status}{" "}
          {profile.company && <span> at {profile.company}</span>}
        </p>
        <p className="my-1">
          {profile.location && <span>{profile.location}</span>}
        </p>
        <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>

      <ul>
        {profile.skills.slice(0, 5).map((skill, index) => (
          <li className="text-primary" key={index}>
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItems.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItems;
