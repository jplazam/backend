const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = function (req, res, next) {
  const token = req.cookies["jwtoken"];

  if (!token) {
    return res.status(401).json({ error: "token missing" });
  }

  try {
    const content = jwt.verify(token, authConfig.secret);
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    req.user_id = content.user;
    next();
  } catch (ex) {
    return res.status(400).json({ error: "token invalid" });
  }
};
