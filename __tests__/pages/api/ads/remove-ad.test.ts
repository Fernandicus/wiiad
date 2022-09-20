import httpMock from "node-mocks-http";
import removeAd from "@/pages/api/ads/remove-ad";
import { NextApiResponse } from "next";
import { AdModel } from "@/src/ad/infraestructure/AdModel";

describe("On api/ads/remove-ad route", () => {

  it("When send 'DELETE' method with correct ad id response with status 200", async () => {
    const req = httpMock.createRequest({
      method: "DELETE",
      body: {
        adId: "12345",
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
