import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import * as actions from "../../store/actions/indexActions";

const CommentItems = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  onRemoveComment
}) => {
  console.log("post id", postId);
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY-MM-DD">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={e => {
              console.log("post id ag", postId);
              onRemoveComment(postId, _id);
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItems.propTypes = {
  onRemoveComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRemoveComment: (postId, comment_id) =>
      dispatch(actions.removeComment(postId, comment_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentItems);
