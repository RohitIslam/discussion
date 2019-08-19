const express = require("express");
const gravatar = require("gravatar");
const bcryptjs = require("bcryptjs");
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
        res.json({ msg: "Success" });
      } else {
        res.status(400).json({ password: "Incorrect Password" });
      }
    });
  });
});

module.exports = router;
