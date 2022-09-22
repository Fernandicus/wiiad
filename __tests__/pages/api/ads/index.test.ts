import { AdModel, AdModelProps } from "@/src/ad/infraestructure/AdModel";
import mongoose from "mongoose";
import httpMock from "node-mocks-http";
import findAd from "@/pages/api/ads";
import { AdUniqId } from "@/src/ad/infraestructure/AdUniqId";
import { FakeAd } from "../../../../__mocks__/lib/advertise/FakeAd";
import { AdPropsPrimitives } from "@/src/ad/domain/Ad";
import { getToken, JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

jest.mock("next-auth/jwt");

describe("On api/ads ", () => {
  beforeAll(async () => {
    const mongoDBUrl: string = process.env.MONGODB_URL!;
    await mongoose.connect(mongoDBUrl);
    await AdModel.deleteMany({});
  }, 8000);

  afterAll(async () => {
    await mongoose.disconnect();
  }, 8000);

  it.only("== When send 'GET' request receive all user ads and a statusCode 200", async () => {
    const amount = Math.floor(Math.random() * 5);
    const advertiserId = AdUniqId.generate();

    const adsArray = FakeAd.createManyWithPrimitives(advertiserId, amount);
    const adsModel = adsArray.map((ad): AdModelProps => {
      return { ...ad, _id: ad.id };
    });

    await AdModel.insertMany(adsModel);

    const mongooseTotal = await AdModel.count({ advertiserId });
    const token: JWT = { rol: "business", id: advertiserId };
    (getToken as jest.Mock).mockResolvedValue(token);

    const req = httpMock.createRequest({ method: "GET" });
    const res = httpMock.createResponse();

    await findAd(req, res);

    const adsData: AdPropsPrimitives[] = JSON.parse(res._getJSONData().ads);

    expect(res.statusCode).toBe(200);
    expect(adsData.length).toBe(mongooseTotal);
  }, 8000);

  it("When send 'GET' request receive all user ads and a statusCode 200", async () => {
    //TODO: Send token with a non existing advertiserId to get 0 ads
  }, 8000);
});
