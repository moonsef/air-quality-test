const mongoose = require("mongoose");

const AirQualitySchema = new mongoose.Schema({
  payload: {
    type: Object,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

const AirQuality = mongoose.model("AirQuality", AirQualitySchema);
module.exports = AirQuality;
