require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { airQualityRouter } = require("./routes");
const { airQualityCron } = require("./cron");

mongoose.connect(process.env.MONGODB_URL);

mongoose.connection
  .on("open", () => {
    app.use(express.json());
    app.use("/api/air-quality", airQualityRouter);

    airQualityCron.start();

    app.listen(process.env.APP_PORT, () => {
      console.log(
        `The server is up and running on port ${process.env.APP_PORT}`
      );
    });
  })
  .on("error", () => console.log("Cannot connect to DB: ", err.message));
