import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../store/actions/indexActions";
import Spinner from "../UI/Spinner/Spinner";
import PostItems from "./PostItems";
import PostForm from "./PostForm";

const Posts = ({ onGetAllPost, post: { posts, loading } }) => {
  useEffect(() => {
    onGetAllPost();
  }, [onGetAllPost]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community
          </p>
          <PostForm />
          <div className="posts">
            {posts.length > 0 ? (
              posts.map(post => <PostItems key={post._id} post={post} />)
            ) : (
              <h4> No post found </h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  onGetAllPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    post: state.post
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetAllPost: () => dispatch(actions.getAllPosts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
