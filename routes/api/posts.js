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

// POST API START

// router.post(
//     "/",
//     passport.authenticate("jwt", { session: false }),
//     (req, res) => {
//         const { errors, isValid } = validatePostInput(req.body);

//         //Check validation
//         if (!isValid) {
//             return res.status(400).json(errors);
//         }

//         const newPost = new Post({
//             text: req.body.text,
//             name: req.body.name,
//             avatar: req.body.avatar,
//             user: req.user.id
//         });

//         newPost.save().then(post => res.json(post));
//     }
// );

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

module.exports = router;
