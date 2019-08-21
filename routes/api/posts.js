const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load Input Validation
const validatePostInput = require("../../validation/post");

//Load Models
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// GET API START

// @route GET api/posts/test
// @description Tests posts route
// @access Public
router.get("/test", (req, res) =>
  res.json({ msg: "test route works for posts" })
);

// @route GET api/post/
// @description get all posts
// @access Public

router.get("/", (req, res) => {
  const errors = {};
  Post.find()
    .sort({ date: -1 }) //latest posts will appear first
    .populate("user", ["name", "avatar"])
    .then(posts => {
      if (!posts) {
        errors.noPost = "There are no posts";
        return res.status(404).json(errors);
      }
      res.json(posts);
    })
    .catch(err => res.status(400).json({ error: "There are no posts" }));
});

// @route GET api/post/:id
// @description get post by id
// @access Public

router.get("/:id", (req, res) => {
  const errors = {};
  Post.findById(req.params.id)
    .populate("user", ["name", "avatar"])
    .then(post => {
      if (!post) {
        errors.noPost = "No post found with that ID";
        return res.status(404).json(errors);
      }
      res.json(post);
    })
    .catch(err =>
      res.status(400).json({ error: "No post found with that ID" })
    );
});

// GET API END

// POST API START

// @route Post api/posts
// @description Create post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route POST api/post/like/:id
// @description Like post
// @access Private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            // check for the post owner
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0 //check if there is user id in the likes array or not
            ) {
              errors.alreadyLiked = "User already liked this post";
              return res.status(400).json(errors);
            }

            //Add user id to likes array
            post.likes.unshift({ user: req.user.id });

            //save likes to the database
            post.save().then(post => res.json(post));
          })
          .catch(err => res.status(400).json({ errors: "Post not found" }));
      })
      .catch(err => res.status(400).json({ errors: "Profile not found" }));
  }
);

// @route POST api/post/unlike/:id
// @description Unlike post
// @access Private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            // check for the post owner
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length === 0 //check if there is user id in the likes array or not
            ) {
              errors.notLiked = "You have not yet liked this post";
              return res.status(400).json(errors);
            }

            //Get remove index
            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);

            //splice it out of the array
            post.likes.splice(removeIndex, 1);

            //save
            post.save().then(post => res.json(post));
          })
          .catch(err => res.status(400).json({ errors: "Post not found" }));
      })
      .catch(err => res.status(400).json({ errors: "Profile not found" }));
  }
);

// @route POST api/post/comment/:id
// @description Add comment to post
// @access Private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        //Add comments to array
        post.comments.unshift(newComment);

        //save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ errors: "Post not found" }));
  }
);

// POST API END

// DELETE API START

// @route DELETE api/post/:id
// @description DELETE post by id
// @access Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            // check for the post owner
            if (post.user.toString() !== req.user.id) {
              errors.notAuthorized = "User not authorized";
              return res.status(401).json(errors);
            }
            //Delete
            post
              .remove()
              .then(() => res.json({ success: "Post successfully deleted" }));
          })
          .catch(err => res.status(400).json({ errors: "Post not found" }));
      })
      .catch(err => res.status(400).json({ errors: "Profile not found" }));
  }
);

// @route DELETE api/post/comment/:post_id/:comment_id
// @description delete comment to post
// @access Private

router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Post.findById(req.params.post_id)
      .then(post => {
        // check id comment exist or not
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          errors.noCommentExist = "Comment does not exist";
          return res.status(401).json(errors);
        }

        //Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        //splice it out of the array
        post.comments.splice(removeIndex, 1);

        //save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ errors: "Post not found" }));
  }
);

// DELETE API END

module.exports = router;
