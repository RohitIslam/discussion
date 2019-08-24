const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");

  //check for no token
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: "No Token, Authorization Denied" }] });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("secretOrKey"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ errors: [{ msg: "Token is not valid" }] });
  }
};
