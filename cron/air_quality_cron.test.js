const axios = require("../config/axios");
const AirQuality = require("../models/air_quality");
const { airQualityCronImpl, airQualityCron } = require("./air_quality");
const mongoose = require("mongoose");

jest.mock("../config/axios");

beforeAll(async () => {
  // prevent from running the actual cron job
  airQualityCron.stop();

  const url = `mongodb://localhost/test`;
  await mongoose.connect(url);
});

afterEach(async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
});

afterAll(async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      if (error.message === "ns not found") return;
      if (error.message.includes("a background operation is currently running"))
        return;
      console.log(error.message);
    }
  }
  await mongoose.connection.close();
});

describe("Get air quality API", () => {
  test("It return air quality for a GPS conrdinates", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          data: {
            current: {
              pollution: {
                ts: "2022-10-03T21:00:00.000Z",
                aqius: 100,
                mainus: "p2",
                aqicn: 34,
                maincn: "p2",
              },
            },
          },
        },
      })
    );

    await airQualityCronImpl();
    const res = await AirQuality.find({}).exec();

    expect(res.length).toBe(1);
    expect(res[0].payload.ts).toBe("2022-10-03T21:00:00.000Z");
  });
});
