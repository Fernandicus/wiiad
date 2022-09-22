import httpMock from "node-mocks-http";
import createAdvertise from "@/pages/api/ads/create";
import { FakeAd } from "../../../../../__mocks__/lib/ads/FakeAd";
import { UniqId } from "@/src/utils/UniqId";
import { TestAdMongoDBRepository } from "../../../../../__mocks__/lib/ads/infraestructure/TestAdMongoDBRepository";

describe("On 'api/ads/create-ad'", () => {
  beforeAll(async () => {
    await TestAdMongoDBRepository.connectAndClean();
  }, 8000);

  afterAll(async () => {
    await TestAdMongoDBRepository.disconnect();
  }, 8000);

  it("When sending a 'POST' request with all the required params should return a 200 statusCode", async () => {
    const advertiserId = UniqId.generate();
    const adId = UniqId.generate();
    const ad = FakeAd.withIds({ advertiserId, adId });

    const req = httpMock.createRequest({
      method: "POST",
      body: {
        segments: ad.segments.segments,
        advertiserId: ad.advertiserId.id,
        title: ad.title.title,
        description: ad.description.description,
        image: ad.image.image,
        redirectionUrl: ad.redirectionUrl.url,
      },
    });
    const res = httpMock.createResponse();

    await createAdvertise(req, res);

    expect(res.statusCode).toBe(200);
  }, 8000);

  it("When sending a 'POST' request with a not valid params route should return a 400 statusCode", async () => {
    const advertiserId = UniqId.generate();
    const adId = UniqId.generate();
    const ad = FakeAd.withIds({ advertiserId, adId });

    const req = httpMock.createRequest({
      method: "POST",
      body: {
        segments: ad.segments.segments,
        advertiserId: "",
        title: ad.title.title,
        description: ad.description.description,
        image: ad.image.image,
        redirectionUrl: ad.redirectionUrl.url,
      },
    });
    const res = httpMock.createResponse();

    await createAdvertise(req, res);

    expect(res.statusCode).toBe(400);
  }, 8000);

  it("When sending a 'POST' request without all the required params should return a 400 statusCode", async () => {
    const req = httpMock.createRequest({
      method: "POST",
      body: {},
    });

    const res = httpMock.createResponse({});

    await createAdvertise(req, res);

    expect(res.statusCode).toBe(400);
  }, 8000);

  it("When sending a not 'POST' request should return a 400 statusCode", async () => {
    const advertiserId = UniqId.generate();
    const adId = UniqId.generate();
    const ad = FakeAd.withIds({ advertiserId, adId });

    const req = httpMock.createRequest({
      method: "GET",
      body: {
        segments: ad.segments.segments,
        title: ad.title.title,
        description: ad.description.description,
        image: ad.image.image,
        redirectionUrl: ad.redirectionUrl.url,
      },
    });
    const res = httpMock.createResponse();

    await createAdvertise(req, res);

    expect(res.statusCode).toBe(400);
  }, 8000);
});
