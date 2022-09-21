import { AdModel } from "@/src/ad/infraestructure/AdModel";
import mongoose from "mongoose";
import httpMock from "node-mocks-http";
import findAd from "@/pages/api/ads";
import { NextApiResponse } from "next";

describe("On api/ads ", () => {
  beforeAll(async () => {
    const mongoDBUrl: string = process.env.MONGODB_URL!;
    await mongoose.connect(mongoDBUrl);
    await AdModel.deleteMany({});
  }, 8000);

  afterAll(async () => {
    await mongoose.disconnect();
  }, 8000);

  it("When send 'GET' request receive all user ads and a statusCode 200", async () => {
    const req = httpMock.createRequest({ method: "GET" });
    const res: NextApiResponse = httpMock.createResponse();

    await findAd(req, res);

    expect(res.statusCode).toBe(200);
  }, 8000);
});
