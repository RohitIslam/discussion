const express = require("express");
const router = express.Router();

// @route GET api/users/test
// @description Tests users route
// @access Public
router.get("/test", (req, res) =>
  res.json({ msg: "test route works for user" })
);

module.exports = router;
