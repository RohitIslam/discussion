const express = require("express");
const gravatar = require("gravatar");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");
const router = express.Router();

//Load Models
const User = require("../../models/User");

// @route GET api/users/test
// @description Tests users route
// @access Public
router.get("/test", (req, res) =>
  res.json({ msg: "test route works for user" })
);

// @route GET api/users/register
// @description User registration route
// @access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default avatar
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      // encrypting password and saving data to the database
      bcryptjs.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcryptjs.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.json(user);
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
    }
  });
});

// @route GET api/users/login
// @description Login / Returning JWT Token
// @access Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
    //Check for user
    if (!user) res.status(400).json({ email: "User not found" });

    //Check password
    bcryptjs.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //Create JWT Payload

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        res.status(400).json({ password: "Incorrect Password" });
      }
    });
  });
});

// @route GET api/users/current
// @description Return current user
// @access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => res.json(req.user)
);

module.exports = router;
