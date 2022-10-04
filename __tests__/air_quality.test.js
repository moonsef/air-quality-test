const express = require("express");
const router = require("../routes/air_quality");
const request = require("supertest");

const axios = require("../config/axios");

jest.mock("../config/axios");
const app = express();

app.use(express.json());
app.use("/api/air-quality", router);

describe("Get air quality API", () => {
  test("It return 400 bad request when longitude and latitude are empty", async () => {
    const res = await request(app).get("/api/air-quality");
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "The field longitude and latitude are required"
    );
  });

  test("It return air quality for a GPS conrdinates", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          data: {
            current: {
              pollution: {
                ts: "2022-10-03T21:00:00.000Z",
                aqius: 76,
                mainus: "p2",
                aqicn: 34,
                maincn: "p2",
              },
            },
          },
        },
      })
    );

    const res = await request(app)
      .get("/api/air-quality")
      .query({ longitude: "12.23", latitude: "87.34" });

    expect(res.statusCode).toBe(200);
    expect(res.body.Result).toBeDefined();
    expect(res.body.Result.Pollution.ts).toBe("2022-10-03T21:00:00.000Z");
    expect(res.body.Result.Pollution.aqius).toBe(76);
    expect(res.body.Result.Pollution.mainus).toBe("p2");
    expect(res.body.Result.Pollution.aqicn).toBe(34);
    expect(res.body.Result.Pollution.maincn).toBe("p2");
  });
});
