const { axios } = require("../config");
const AirQuality = require("../models/air_quality");

const getAirQuality = async (req, res) => {
  const { longitude, latitude } = req.query;

  if (!longitude || !latitude) {
    return res.status(400).json({
      message: "The field longitude and latitude are required",
    });
  }

  try {
    const {
      data: {
        data: { current },
      },
    } = await axios.get("/v2/nearest_city", {
      params: {
        lat: latitude,
        lon: longitude,
        key: process.env.IQAIR_API_KEY,
      },
    });

    return res.json({
      Result: {
        Pollution: current.pollution,
      },
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const getMostPollutedDateTime = async (req, res) => {
  try {
    const data = await AirQuality.find()
      .sort({ "payload.aqius": "desc" })
      .limit(1)
      .exec();

    return res.json({
      Result: {
        CreatedAt: data[0].created_at,
      },
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = {
  getAirQuality,
  getMostPollutedDateTime,
};
