const router = require("express").Router();
const { airQualityController } = require("../controllers");

router.get("/", airQualityController.getAirQuality);
router.get("/most-polluted", airQualityController.getMostPollutedDateTime);

module.exports = router;
