import { AdModel, AdModelProps } from "@/src/ad/infraestructure/AdModel";
import mongoose from "mongoose";
import httpMock, { MockRequest, MockResponse } from "node-mocks-http";
import findAd from "@/pages/api/ads";
import { UniqId } from "@/src/utils/UniqId";
import { AdPropsPrimitives } from "@/src/ad/domain/Ad";
import { NextApiRequest, NextApiResponse } from "next";
import { TestAdMongoDBRepository } from "../../../../__mocks__/lib/ads/infraestructure/TestAdMongoDBRepository";
import { TestCreateAd } from "../../../../__mocks__/lib/ads/use-case/TestCreateAd";
import { FakeAd } from "../../../../__mocks__/lib/ads/FakeAd";
import { TestCreateAdController } from "../../../../__mocks__/lib/ads/controller/TestCreateAdController";

describe("On api/ads, GIVEN some Ads saved in MognoDB ", () => {
  let advertiserId: string;
  let req: MockRequest<NextApiRequest>;
  let res: MockResponse<NextApiResponse>;

  beforeAll(async () => {
    const testAdRepo = await TestAdMongoDBRepository.connectAndClean();
    const testCreateAd = new TestCreateAd(testAdRepo);
    const controller = new TestCreateAdController(testCreateAd);
    const createAdsData = await controller.crateMany();
    advertiserId = createAdsData.advertiserId;
  }, 8000);

  afterAll(async () => {
    await TestAdMongoDBRepository.disconnect();
  }, 8000);

  it(`WHEN send a 'GET' request, 
  THEN receive a statusCode 200 and same amount of ads that in the DB`, async () => {
    const adsInMongoose = await AdModel.count({ advertiserId });

    req = httpMock.createRequest({ method: "GET", body: { id: advertiserId } });
    res = httpMock.createResponse();
    await findAd(req, res);

    const adsData: AdPropsPrimitives[] = JSON.parse(res._getJSONData().ads);
    expect(res.statusCode).toBe(200);
    expect(adsData.length).toBe(adsInMongoose);
  });
});
