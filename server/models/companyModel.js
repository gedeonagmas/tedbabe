const mongoose = require("mongoose");
const valid = require("../utils/validator");
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      validate: valid.required("name"),
    },

    logo: {
      type: String,
      validate: valid.required("Logo"),
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

const Company = mongoose.model("company", companySchema);
module.exports = { Company };
