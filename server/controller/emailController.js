const AppError = require("../utils/AppError");
const nodemailer = require("nodemailer");

const sendEmailHandler = ({
  subject,
  to,
  from,
  response,
  res,
  next,
  email,
  html,
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "gedeonagmas2580@gmail.com",
      pass: "wirj dllf xaow tcyu",
    },
  });

  const mailOptions = {
    from: from ? from : "tedbabehara <info@tedbabehara.com",
    to: email ? email : to,
    subject: subject,
    html: html,
  };

  // return console.log("email sent");
  return transporter.sendMail(mailOptions, function (error, info) {
    console.log(info, "info");
    if (error) {
      console.log("Error in sending email  " + error);
      if (next)
        return next(
          new AppError(
            "Something went wrong unable to send the email, check your connection and email then try again!",
            500
          )
        );
    } else if (res && response) {
      console.log("email sent successfully from response");
      return res.status(200).json({ message: response });
    } else {
      console.log("email sent successfully");
      return;
    }
  });
};

module.exports = { sendEmailHandler };
