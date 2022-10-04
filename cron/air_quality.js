const cron = require("node-cron");
const { axios } = require("../config");
const AirQuality = require("../models/air_quality");

const airQualityCronImpl = async () => {
  try {
    const {
      data: {
        data: { current },
      },
    } = await axios.get("/v2/nearest_city", {
      params: {
        lat: "48.856613",
        lon: "2.352222",
        key: process.env.IQAIR_API_KEY,
      },
    });

    await AirQuality.create({
      payload: current.pollution,
      created_at: new Date(),
    });
  } catch (err) {
    console.log(err);
  }
};

const airQualityCron = cron.schedule("* * * * *", airQualityCronImpl);

module.exports = {
  airQualityCron,
  airQualityCronImpl,
};
