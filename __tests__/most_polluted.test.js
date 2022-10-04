const express = require("express");
const router = require("../routes/air_quality");
const request = require("supertest");
const mongoose = require("mongoose");
const AirQuality = require("../models/air_quality");

const app = express();

app.use(express.json());
app.use("/api/air-quality", router);

beforeAll(async () => {
  const url = `mongodb://localhost/test`;
  await mongoose.connect(url);

  await AirQuality.create({
    payload: {
      aqius: 67,
      mainus: "p2",
      maincn: "p2",
      ts: "2022-10-03T21:00:00.000Z",
      aqicn: 28,
    },
    //random date
    created_at: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
  });
  await AirQuality.create({
    payload: {
      aqius: 190,
      mainus: "p2",
      maincn: "p2",
      ts: "2022-10-03T21:00:00.000Z",
      aqicn: 28,
    },
    //random date
    created_at: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
  });

  await AirQuality.create({
    payload: {
      aqius: 200,
      mainus: "p2",
      maincn: "p2",
      ts: "2022-10-03T21:00:00.000Z",
      aqicn: 28,
    },
    created_at: new Date("Tue Oct 04 2022 01:24:13 GMT+0100 (GMT+01:00)"),
  });
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

describe("Get most polluted datetime", () => {
  test("It return the most polluted datetime", async () => {
    const res = await request(app).get("/api/air-quality/most-polluted");

    expect(res.statusCode).toBe(200);
    expect(res.body.Result).toBeDefined();
    expect(res.body.Result.CreatedAt).toBe(
      new Date("Tue Oct 04 2022 01:24:13 GMT+0100 (GMT+01:00)").toISOString()
    );
  });
});
