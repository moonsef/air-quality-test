const cron = require("node-cron");
const { axios } = require("../config");

const task = cron.schedule("* * * * *", async () => {
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

    // TODO: store pollution in a database
    console.log(current.pollution);
  } catch (err) {
    console.log(err);
  }
});

module.exports = task;
