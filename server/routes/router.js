const express = require("express");
const { upload } = require("../utils/upload.js");
const { authentication } = require("../middleware/authentication.js");
const {
  _create,
  _delete,
  _read,
  _update,
} = require("../controller/factoryController.js");

const {
  signupHandler,
  loginHandler,
  forgetPassword,
  resetPassword,
  updatePassword,
  sendEmail,
  logoutHandler,
} = require("../controller/accountController.js");

const router = express.Router();

const files = upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);

//user account route
router.route("/signup").post(files, signupHandler);

router.route("/login").post(loginHandler);

router.route("/logout").post(logoutHandler);

router.route("/forgetPassword").post(forgetPassword);

router.route("/resetPassword").post(resetPassword);

router.route("/updatePassword").put(authentication, updatePassword);

//factory route
router
  .route("/:table")
  .post(authentication, files, _create)
  .get(authentication, _read)
  .put(authentication, files, _update)
  .delete(authentication, _delete);

module.exports = { router };
