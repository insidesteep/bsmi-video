const { Schema, model } = require("mongoose");

const AuthorSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    patronymic: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    login: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Author", AuthorSchema);
