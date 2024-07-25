const mongoose = require("mongoose");
const mongodb = async () => {
  await mongoose.connect(process.env.MONGO_URI); //replace by MONGO_URL
  console.log("tedbabehara database connected successfully");
};

module.exports = { mongodb };
