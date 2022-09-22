import httpMock from "node-mocks-http";
import removeAd from "@/pages/api/ads/remove";
import { NextApiResponse } from "next";
import { AdModel } from "@/src/ad/infraestructure/AdModel";
import { FakeAd } from "../../../../../__mocks__/lib/advertise/FakeAd";
import { UniqId } from "@/src/utils/UniqId";
import mongoose from "mongoose";

describe("On api/ads/remove-ad route", () => {
  beforeAll(async () => {
    const mongoDBUrl: string = process.env.MONGODB_URL!;
    await mongoose.connect(mongoDBUrl);
    await AdModel.deleteMany({});
  }, 8000);

  afterAll(async () => {
    await mongoose.disconnect();
  }, 8000);

  it("When send 'DELETE' method with correct ad id response with status 200", async () => {
    const advertiserId = UniqId.generate();
    const adId = UniqId.generate();
    const adData = FakeAd.withIds({ advertiserId, adId });
    const ad = new AdModel({
      title: adData.title.title,
      description: adData.description.description,
      _id: adData.id.id,
      advertiserId: adData.advertiserId.id,
      image: adData.image.image,
      redirectionUrl: adData.redirectionUrl.url,
      segments: adData.segments.segments,
    });
    await ad.save();

    const req = httpMock.createRequest({
      method: "DELETE",
      body: {
        adId: ad.id,
      },
    });
    const res: NextApiResponse = httpMock.createResponse();

    await removeAd(req, res);

    expect(res.statusCode).toBe(200);
  }, 8000);

  it("When send 'DELETE' method without a correct ad id response with status 400", async () => {
    const req = httpMock.createRequest({
      method: "DELETE",
      body: {},
    });
    const res: NextApiResponse = httpMock.createResponse();

    await removeAd(req, res);

    expect(res.statusCode).toBe(400);
  }, 8000);

  it("When send a not 'DELETE' method response with status 400", async () => {
    const req = httpMock.createRequest({
      method: "POST",
      body: {
        adId: "12345",
      },
    });
    const res: NextApiResponse = httpMock.createResponse();

    await removeAd(req, res);

    expect(res.statusCode).toBe(400);
  }, 8000);
});
