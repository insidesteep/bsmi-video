const jwt = require("jsonwebtoken");
const { jwtSecretToken } = require("../../config/config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.cookies.auth;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Нет авторизации" });
    }

    const decoded = jwt.verify(token, jwtSecretToken);

    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ success: false, message: "Нет авторизации" });
  }
};
