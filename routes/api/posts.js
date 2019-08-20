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

// @route GET api/post/all
// @description get all posts
// @access Public

router.get("/", (req, res) => {
  const errors = {};
  Post.find()
    .sort({ date: -1 }) //latest posts will appear first
    .populate("user", ["name", "avatar"])
    .then(posts => {
      if (!posts) {
        errors.noProfile = "There are no posts";
        res.status(404).json(errors);
      }
      res.json(posts);
    })
    .catch(err => res.status(400).json({ error: "There are no posts" }));
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
      return res.status(400).json({ errors });
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

// POST API END

// DELETE API START
// DELETE API END

module.exports = router;
