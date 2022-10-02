const router = require("express").Router();
const { airQuality } = require("../controllers");

router.get("/", airQuality.getAirQuality);

module.exports = router;
