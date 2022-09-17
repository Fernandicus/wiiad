import { render, screen } from "@testing-library/react";
import httpMock from "node-mocks-http";
import createAdvertise from "@/pages/api/ads/create-ad";
import { FakeAd } from "../../../../__mocks__/lib/advertise/FakeAd";
import mongoose from "mongoose";

describe("On 'api/advertisements'", () => {

  it("When sending a 'POST' request with all the required params to the '/create-advertise' route should return a 200 statusCode", async () => {
    const advertiserId = new mongoose.Types.ObjectId().toHexString();
    const adId = new mongoose.Types.ObjectId().toHexString();
    const ad = FakeAd.withIds({advertiserId, adId});

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
  });

  it("When sending a 'POST' request with a not valid Advertiser Id to the '/create-advertise' route should return a 400 statusCode", async () => {
    const advertiserId = new mongoose.Types.ObjectId().toHexString();
    const adId = new mongoose.Types.ObjectId().toHexString();
    const ad = FakeAd.withIds({advertiserId, adId});

    const req = httpMock.createRequest({
      method: "POST",
      body: {
        segments: ad.segments.segments,
        advertiserId: "123",
        title: ad.title.title,
        description: ad.description.description,
        image: ad.image.image,
        redirectionUrl: ad.redirectionUrl.url,
      },
    });
    const res = httpMock.createResponse();

    await createAdvertise(req, res);

    expect(res.statusCode).toBe(400);
  });

  it("When sending a 'POST' request without all the required params to the '/create-advertise' route should return a 400 statusCode", async () => {
    const req = httpMock.createRequest({
      method: "POST",
      body: {},
    });

    
    const res = httpMock.createResponse({});

    await createAdvertise(req, res);

    expect(res.statusCode).toBe(400);
  });

  it("When sending a 'GET' request to the '/create-advertise' route should return a 400 statusCode", async () => {
    const advertiserId = new mongoose.Types.ObjectId().toHexString();
    const adId = new mongoose.Types.ObjectId().toHexString();
    const ad = FakeAd.withIds({advertiserId, adId});
    
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
  });
});
