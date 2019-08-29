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
    const posts = await Post.find().sort({ date: -1 }); //latest posts will appear first
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

// @route POST api/post/comment/:id
// @description Add comment to post
// @access Private
router.post(
  "/comment/:id",
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
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      //Add comments to array
      post.comments.unshift(newComment);

      await post.save();

      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// // POST API END

// PUT API START

// @route POST api/post/like/:id
// @description Like post
// @access Private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check for the post owner
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0 //check if there is user id in the likes array or not
    ) {
      return res.status(400).json({ msg: "You already liked this post" });
    }

    //Add user id to likes array
    post.likes.unshift({ user: req.user.id });

    //save likes to the database
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/post/unlike/:id
// @description Unlike post
// @access Private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check for the post owner
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0 //check if there is user id in the likes array or not
    ) {
      return res.status(400).json({ msg: "You have not yet liked this post" });
    }

    //Get remove index
    const removeIndex = post.likes
      .map(item => item.user.toString())
      .indexOf(req.user.id);

    //splice it out of the array
    post.likes.splice(removeIndex, 1);

    //save likes to the database
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// PUT API END

// DELETE API START

// @route Delete api/posts/:id
// @description Delete post
// @access Public
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check for the user
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

// @route DELETE api/post/comment/:post_id/:comment_id
// @description delete comment to post
// @access Private
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // check for the user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User Not Authorized" });
    }

    // check id comment exist or not
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    //Get remove index
    const removeIndex = post.comments
      .map(item => item._id.toString())
      .indexOf(req.params.comment_id);

    //splice it out of the array
    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json({ msg: "Comment Deleted" });
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res
        .status(400)
        .json({ errors: [{ msg: "No post or comment found" }] });
    }
    res.status(500).send("Server error");
  }
});

// DELETE API END

module.exports = router;
