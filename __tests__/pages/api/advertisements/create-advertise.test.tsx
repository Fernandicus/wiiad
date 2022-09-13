import { render, screen } from "@testing-library/react";
import httpMock from "node-mocks-http";
import createAdvertise from "@/pages/api/advertisements/create-advertise";
import { NextApiRequest, NextApiResponse } from "next";

describe("On 'api/advertisements'", () => {

  it("When sending a 'POST' request with all the required params to the '/create-advertise' route should return a 200 status", async () => {
    const req = httpMock.createRequest({
      method: "POST",
      body: {
        title: "My new ad",
        description: "Amazing advertise",
        image: "ad-image.png",
        redirectionUrl: "mysite.com",
      },
    });
    const res = httpMock.createResponse();

    const response = (await createAdvertise(req, res)) as NextApiResponse;

    expect(response.statusCode).toBe(200);
  });

  it("When sending a 'POST' request without all the required params to the '/create-advertise' route should return a 400 status", async () => {
    const req = httpMock.createRequest({
      method: "POST",
      body: {
        description: "Amazing advertise",
        image: "ad-image.png",
        redirectionUrl: "mysite.com",
      },
    });
    const res = httpMock.createResponse();

    const response = (await createAdvertise(req, res)) as NextApiResponse;

    expect(response.statusCode).toBe(400);
  });
});
