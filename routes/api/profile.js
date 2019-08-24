const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/authMiddleware");
const config = require("config");
const request = require("request");
const { check, validationResult } = require("express-validator");

//Load Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// GET API START

// @route GET api/profile
// @description Get all profiles
// @access Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/profile/me
// @description Get current user profile
// @access Private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res
        .status(400)
        .json({ errors: [{ msg: "There is no profile for this user" }] });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/profile/user/:user_id
// @description Get user profile by user id
// @access public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ errors: [{ msg: "Profile not found" }] });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ errors: [{ msg: "Profile not found" }] });
    }
    res.status(500).send("Server error");
  }
});

// @route GET api/profile/github/:username
// @description Get user repos from github
// @access Public

router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientID"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    request(options, (error, response, body) => {
      if (error) console.log(error);

      if (response.statusCode !== 200) {
        res.status(404).json({ msg: "No Github profile found" });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// GET API END

// POST API START

// @route POST api/profile
// @description create or update user profile
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required")
        .not()
        .isEmpty(),
      check("skills", "Skills is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      skills,
      githubUserName,
      youtube,
      facebook,
      linkedin,
      twitter,
      instagram
    } = req.body;

    //Get fields
    const profileFeilds = {};
    profileFeilds.user = req.user.id;

    if (company) profileFeilds.company = company;
    if (website) profileFeilds.website = website;
    if (bio) profileFeilds.bio = bio;
    if (location) profileFeilds.location = location;
    if (githubUserName) profileFeilds.githubUserName = githubUserName;
    if (status) profileFeilds.status = status;

    //Skills - split into array
    if (skills) {
      profileFeilds.skills = skills.split(",").map(skill => skill.trim());
    }
    // Socials
    profileFeilds.social = {};
    if (youtube) profileFeilds.social.youtube = youtube;
    if (facebook) profileFeilds.social.facebook = facebook;
    if (linkedin) profileFeilds.social.linkedin = linkedin;
    if (twitter) profileFeilds.social.twitter = twitter;
    if (instagram) profileFeilds.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // if there is a profile found than it will perform as UPDATE PROFILE API
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFeilds },
          { new: true }
        );
        return res.json(profile);
      }
      // if there no profile found, than it will perform as CREATE PROFILE API

      profile = new Profile(profileFeilds);

      await profile.save();

      return res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// // POST API END

// // PUT API START

// @route PUT api/profile/experience
// @description Add experience to profile
// @access Private

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("company", "Company is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      title,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExperience);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route PUT api/profile/education
// @description Add education to profile
// @access Private

router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required")
        .not()
        .isEmpty(),
      check("degree", "Degree is required")
        .not()
        .isEmpty(),
      check("feildOfStudy", "Feild of study is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      feildOfStudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEducation = {
      degree,
      school,
      feildOfStudy,
      from,
      to,
      current,
      description
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEducation);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// // PUT API END

// DELETE API START

// @route DELETE api/profile
// @description DELETE user and profile and posts
// @access Private

router.delete("/", auth, async (req, res) => {
  try {
    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({
      success: "User with profile and posts are successfully deleted"
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route DELETE api/profile/experience/experience_id
// @description DELETE experience from profile
// @access Private

router.delete("/experience/:experience_id", auth, async (req, res) => {
  try {
    //remove profile
    const profile = await Profile.findOne({ user: req.user.id });

    //get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.experience_id);

    //Splice out of array
    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route DELETE api/profile/education/education_id
// @description DELETE education from profile
// @access Private

router.delete("/education/:education_id", auth, async (req, res) => {
  try {
    //remove profile
    const profile = await Profile.findOne({ user: req.user.id });

    //get remove index
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.education_id);

    //Splice out of array
    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE API END

module.exports = router;
