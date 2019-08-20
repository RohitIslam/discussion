const express = require("express");
const router = express.Router();
const passport = require("passport");

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

// GET API END

// POST API START

// @route Post api/posts
// @description Create post
// @access Private
router.post(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
