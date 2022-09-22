import { AdModel, AdModelProps } from "@/src/ad/infraestructure/AdModel";
import mongoose from "mongoose";
import httpMock, { MockRequest, MockResponse } from "node-mocks-http";
import findAd from "@/pages/api/ads";
import { UniqId } from "@/src/utils/UniqId";
import { AdPropsPrimitives } from "@/src/ad/domain/Ad";
import { getToken, JWT } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { TestAdMongoDBRepository } from "../../../../__mocks__/lib/advertise/infraestructure/TestAdMongoDBRepository";
import { TestCreateAd } from "../../../../__mocks__/lib/advertise/use-case/TestCreateAd";
import { FakeAd } from "../../../../__mocks__/lib/advertise/FakeAd";

jest.mock("next-auth/jwt");

describe("On api/ads, GIVEN some Ads saved in MognoDB ", () => {
  let advertiserId: string = UniqId.generate();
  let req: MockRequest<NextApiRequest>;
  let res: MockResponse<NextApiResponse>;

  beforeAll(async () => {
    const adRepo = await TestAdMongoDBRepository.connect();
    const createAd = new TestCreateAd(adRepo);
    const amount = Math.floor(Math.random() * 5);
    const adsArray = FakeAd.createMany(advertiserId, amount);
    await createAd.saveMany(adsArray);
  }, 8000);

  afterAll(async () => {
    await mongoose.disconnect();
  }, 8000);

  it(`WHEN send a 'GET' request, 
  THEN receive a statusCode 200 and same amount of ads that in the DB`, async () => {
    const adsInMongoose = await AdModel.count({ advertiserId });
    const token: JWT = { rol: "business", id: advertiserId };
    (getToken as jest.Mock).mockResolvedValue(token);
    req = httpMock.createRequest({ method: "GET" });
    res = httpMock.createResponse();
    await findAd(req, res);

    const adsData: AdPropsPrimitives[] = JSON.parse(res._getJSONData().ads);
    expect(res.statusCode).toBe(200);
    expect(adsData.length).toBe(adsInMongoose);
  });

  it(`WHEN send 'GET' request and User is not logged in or has not a rol of business or agency, 
  THEN receive a statusCode 400`, async () => {
    const token: JWT = { rol: "user", id: advertiserId };
    (getToken as jest.Mock).mockResolvedValue(token);
    await findAd(req, res);

    expect(res.statusCode).toBe(400);
  }, 8000);
});