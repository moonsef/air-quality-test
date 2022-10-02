require("dotenv").config();

const express = require("express");
const app = express();
const { airQuality } = require("./routes");

app.use(express.json());
app.use("/api/air-quality", airQuality);

app.listen(process.env.APP_PORT, () => {
  console.log(`The server is up and running on port ${process.env.APP_PORT}`);
});
