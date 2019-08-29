import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../store/actions/indexActions";

const PostForm = props => {
  const [text, setText] = useState("");

  const changeHandler = event => {
    setText(event.target.value);
  };

  const formSubmitHandler = event => {
    event.preventDefault();

    props.onAddPost({ text });

    setText("");
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
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
    onAddPost: formData => dispatch(actions.addPost(formData))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PostForm);
