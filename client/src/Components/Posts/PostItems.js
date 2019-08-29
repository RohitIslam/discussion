import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import * as actions from "../../store/actions/indexActions";

const PostItems = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  onAddLike,
  onRemoveLike,
  onDeletePost
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="/profile">
          <img className="round-img" src={avatar} alt="Avatar" />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY-MM-DD">{date}</Moment>{" "}
        </p>
        <button
          onClick={() => onAddLike(_id)}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-up"></i>{" "}
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button
          onClick={() => onRemoveLike(_id)}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Comment{" "}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user._id === auth.user._id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onDeletePost(_id)}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItems.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  onAddLike: PropTypes.func.isRequired,
  onRemoveLike: PropTypes.func.isRequired,
  onDeletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddLike: postId => dispatch(actions.addLike(postId)),
    onRemoveLike: postId => dispatch(actions.removeLike(postId)),
    onDeletePost: postId => dispatch(actions.deletePost(postId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItems);
