import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../store/actions/indexActions";
import Spinner from "../UI/Spinner/Spinner";

const Posts = ({ onGetAllPost, post: { posts, loading } }) => {
  useEffect(() => {
    onGetAllPost();
  }, [onGetAllPost]);
  return <div></div>;
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
