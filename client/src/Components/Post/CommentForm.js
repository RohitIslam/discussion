import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/indexActions";

const CommentForm = props => {
  const [text, setText] = useState("");

  const changeHandler = event => {
    setText(event.target.value);
  };

  const formSubmitHandler = event => {
    event.preventDefault();

    props.onAddComment({ text }, props.postId);

    setText("");
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a comment</h3>
      </div>
      <form className="form my-1" onSubmit={e => formSubmitHandler(e)}>
        <textarea
          name="text"
          value={text}
          onChange={e => changeHandler(e)}
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onAddComment: (formData, postId) =>
      dispatch(actions.addComment(formData, postId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CommentForm);
