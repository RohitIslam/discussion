const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();

//Load Input Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

//Load Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// GET API START

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
      .populate("user", ["name", "avatar"])
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

// @route GET api/profile/all
// @description get all profiles
// @access Public

router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noProfile = "There are no profiles";
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(400).json({ error: "here are no profiles" }));
});

// @route GET api/profile/handle/:handle
// @description get profile by handle
// @access Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(400).json({ error: "There is no profile for this user" })
    );
});

// @route GET api/profile/user/:user_id
// @description get profile by user id
// @access Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(400).json({ error: "There is no profile for this user" })
    );
});

// GET API END

// POST API START

// @route POST api/profile
// @description Create or Edit user profile
// @access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //Check validation
    if (!isValid) {
      res.status(400).json({ errors });
    }

    //Get fields
    const profileFeilds = {};
    profileFeilds.user = req.user.id;
    if (req.body.handle) profileFeilds.handle = req.body.handle;
    if (req.body.company) profileFeilds.company = req.body.company;
    if (req.body.website) profileFeilds.website = req.body.website;
    if (req.body.bio) profileFeilds.bio = req.body.bio;
    if (req.body.location) profileFeilds.location = req.body.location;
    if (req.body.githubUserName)
      profileFeilds.githubUserName = req.body.githubUserName;
    if (req.body.status) profileFeilds.status = req.body.status;

    //Skills - split into array
    if (typeof req.body.skills !== "undefined") {
      profileFeilds.skills = req.body.skills.split(",");
    }
    // Socials
    profileFeilds.social = {};
    if (req.body.youtube) profileFeilds.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFeilds.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFeilds.social.linkedin = req.body.linkedin;
    if (req.body.twitter) profileFeilds.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFeilds.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // if there is a profile found than it will perform as UPDATE PROFILE API
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFeilds },
            { new: true }
          )
            .then(profile => res.json(profile))
            .catch(err => res.status(400).json(err));
        } else {
          // if there no profile found, than it will perform as CREATE PROFILE API

          //check if handle exist
          Profile.findOne({ handle: profileFeilds.handle })
            .then(profile => {
              // if handle exist then it will throw a error
              if (profile) {
                errors.handle = "That handle already exists";
                res.status(400).json(errors);
              }
              // if handle doesn's exist then it will save profile
              new Profile(profileFeilds)
                .save()
                .then(profile => res.json(profile))
                .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
        }
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route POST api/profile/experience
// @description Add experience to profile
// @access Private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    //Check validation
    if (!isValid) {
      res.status(400).json({ errors });
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newExperience = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };
        // Add to experience array
        profile.experience.unshift(newExperience);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route POST api/profile/education
// @description Add education to profile
// @access Private

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    //Check validation
    if (!isValid) {
      res.status(400).json({ errors });
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newEducation = {
          school: req.body.school,
          degree: req.body.degree,
          feildOfStudy: req.body.feildOfStudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };
        // Add to education array
        profile.education.unshift(newEducation);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(400).json(err));
  }
);

// POST API END

// DELETE API START

// @route DELETE api/profile/experience/experience_id
// @description Add experience to profile
// @access Private

router.delete(
  "/experience/:experience_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.experience_id);

        //Splice out of array
        profile.experience.splice(removeIndex, 1);

        //save
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route DELETE api/profile/education/education_id
// @description Add education to profile
// @access Private

router.delete(
  "/education/:education_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.education_id);

        //Splice out of array
        profile.education.splice(removeIndex, 1);

        //save
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(404).json(err));
  }
);

// DELETE API END

module.exports = router;
