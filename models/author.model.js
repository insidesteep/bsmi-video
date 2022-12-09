import mongoose, { Schema } from "mongoose";

const AuthorSchema = new mongoose.Schema(
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
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Author || mongoose.model("Author", AuthorSchema);
