const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const { jwtSecretToken } = require("../../config/config");
const Author = require("../models/author.model");

module.exports = {
  authenticated: async (req, res) => {
    try {
      const user = await Author.findOne({ _id: req.user.userId });

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        jwtSecretToken,
        {
          expiresIn: "1h",
        }
      );

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("auth", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 3600,
          path: "/",
        })
      );

      res.json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
  login: async (req, res) => {
    const { login, password } = req.body;

    console.log(login, password);

    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ error: errors.array() });
    // }

    try {
      const user = await Author.findOne({ login });

      //   console.log(
      //     bcrypt.hash(password, 10, function (err, hash) {
      //         console.log(hash)
      //     })
      //   );

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Пользователь не найден!" });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res
          .status(400)
          .json({ success: false, message: "Логин или пароль неверный!" });
      }
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        jwtSecretToken,
        {
          expiresIn: "1h",
        }
      );

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("auth", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 3600,
          path: "/",
        })
      );

      res.json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      console.log(res.clearCookie("auth"));

      res.json({ success: true, message: "Выход из системы" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
};
