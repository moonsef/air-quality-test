const router = require("express").Router();
const { airQualityController } = require("../controllers");

router.get("/", airQualityController.getAirQuality);

module.exports = router;
