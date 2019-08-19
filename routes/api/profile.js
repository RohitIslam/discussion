const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();

//Load Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route GET api/profile/test
// @description Tests profile route
// @access Public
router.get("/test", (req, res) =>
  res.json({ msg: "test route works for profile" })
);

// @route GET api/profile
// @description Get current user profile
// @access Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user";
          res.status(400).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
