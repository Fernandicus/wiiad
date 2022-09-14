import { render, screen } from "@testing-library/react";
import httpMock from "node-mocks-http";
import createAdvertise from "@/pages/api/ads/create-ad";
import { NextApiRequest, NextApiResponse } from "next";
import { FakeAd } from "../../../../__mocks__/lib/advertise/FakeAd";

describe.only("On 'api/advertisements'", () => {
  it("When sending a 'POST' request with all the required params to the '/create-advertise' route should return a 200 status", async () => {
    const ad = FakeAd.createRandom();
    const req = httpMock.createRequest({
      method: "POST",
      body: {
        title: ad.title.title,
        description: ad.description.description,
        image: ad.image.image,
        redirectionUrl: ad.redirectionUrl.url,
      },
    });
    const res = httpMock.createResponse();

    const response = (await createAdvertise(req, res)) as NextApiResponse;

    expect(response.statusCode).toBe(200);
  });

  it("When sending a 'POST' request without all the required params to the '/create-advertise' route should return a 400 status", async () => {
    const req = httpMock.createRequest({
      method: "POST",
      body: {},
    });
    const res = httpMock.createResponse();

    const response = (await createAdvertise(req, res)) as NextApiResponse;

    expect(response.statusCode).toBe(400);
  });
});
