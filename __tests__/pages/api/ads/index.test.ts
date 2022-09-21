import { AdModel } from "@/src/ad/infraestructure/AdModel";
import mongoose from "mongoose";
import httpMock from "node-mocks-http";
import findAd from "@/pages/api/ads";
import { NextApiResponse } from "next";
import { AdUniqId } from "@/src/ad/infraestructure/AdUniqId";
import { FakeAd } from "../../../../__mocks__/lib/advertise/FakeAd";
import { AdPropsPrimitives } from "@/src/ad/domain/Ad";

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
    const adsToGenerate = Math.floor(Math.random() * 5);
    const advertiserId = AdUniqId.generate();

    for (var i = 0; i <= adsToGenerate; i++) {
      const adId = AdUniqId.generate();
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
    }
    const mongooseTotal = await AdModel.count({advertiserId})

    //TODO: AVOID USING QUERY TO CATCH ADVERTISER ID,
    //TODO: Use getToken({req}) to get advertiser/user id
    
    const req = httpMock.createRequest({
      method: "GET",
      query: { advertiserId },
    });
    const res = httpMock.createResponse();

    await findAd(req, res);

    const adsData: AdPropsPrimitives[] = JSON.parse(res._getJSONData().ads);

    expect(res.statusCode).toBe(200);
    expect(adsData.length).toBe(mongooseTotal);
  }, 8000);
});
