const express = require("express");
require("dotenv/config");
const path = require("path");
const cors = require("cors");
const { errorController } = require("./controller/errorController.js");
const { mongodb } = require("./config/db.js");
const { router } = require("./routes/router.js");
const { createServer } = require("http");
const cookieParser = require("cookie-parser");

const app = express();
app.use(
  cors({
    origin: true,
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());
app.use("/tedbabe/app/v1/user", router);

app.get("/", (req, res) => {
  res.json("Hello from tedbabehara server");
});

app.all("*", (req, res, next) => {
  res.status(200).json({ message: `${req.originalUrl} is Invalid url` });
  next();
});
app.use(errorController);

mongodb()
  .then(() => {
    const httpServer = createServer(app);

    httpServer.listen(process.env.PORT, (err) => {
      if (err) {
        console.log("something went wrong server not connected");
      }
      console.log("server connected on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
