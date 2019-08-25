const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/authMiddleware");
const config = require("config");
const request = require("request");
const { check, validationResult } = require("express-validator");

//Load Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

// GET API START

// @route GET api/posts
// @description Get all posts
// @access Public

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ date: -1 }) //latest posts will appear first
      .populate("user", ["name", "avatar"]);
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/posts/:id
// @description get post by id
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user", [
      "name",
      "avatar"
    ]);
    if (!post) {
      return res.status(404).json({ msg: "No post found" });
    }
    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ errors: [{ msg: "No post found" }] });
    }
    res.status(500).send("Server error");
  }
});

// GET API END

// POST API START

// @route Post api/posts
// @description Create post
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// // POST API END

// DELETE API START

// @route Delete api/posts/:id
// @description Delete post
// @access Public
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User Not Authorized" });
    }

    if (!post) {
      return res.status(404).json({ msg: "No post found" });
    }

    await post.remove();

    res.json({ msg: "Post Deleted" });
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ errors: [{ msg: "No post found" }] });
    }
    res.status(500).send("Server error");
  }
});

// DELETE API END

module.exports = router;
