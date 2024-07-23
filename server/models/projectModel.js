const mongoose = require("mongoose");
const valid = require("../utils/validator");
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      validate: valid.required("Title"),
    },
    image: {
      type: String,
      validate: valid.required("Image"),
    },

    visible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const Project = mongoose.model("project", projectSchema);
module.exports = { Project };
