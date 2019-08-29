import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/indexActions";
import Spinner from "../UI/Spinner/Spinner";
import PostItems from "../Posts/PostItems";

const Post = ({ onGetPost, post: { post, loading }, match }) => {
  useEffect(() => {
    onGetPost(match.params.id);
  }, [onGetPost]);

  return (
    <Fragment>
      {loading || post === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/posts" className="btn btn-light">
            Back To Posts
          </Link>
          <PostItems post={post} showActions={false} />
        </Fragment>
      )}
    </Fragment>
  );
};

Post.propTypes = {
  onGetPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    post: state.post,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetPost: id => dispatch(actions.getSinglePost(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
