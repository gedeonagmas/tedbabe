const { Company } = require("../models/companyModel");
const { Project } = require("../models/projectModel");
const { User } = require("../models/userModel");
const AppError = require("./AppError");

const selectModel = (name, next) => {
  let model;
  switch (name) {
    case "users":
      model = User;
      break;
    // case "services":
    //   model = Service;
    //   break;
    case "projects":
      model = Project;
      break;
    case "companies":
      model = Company;
      break;
    default:
      return next(
        new AppError("Something went wrong please try again!!!", 500)
      );
  }
  return model;
};

module.exports = { selectModel };
