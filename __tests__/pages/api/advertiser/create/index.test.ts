import createAdvertiser from "@/pages/api/advertiser/create/index";
import { AdvertiserPropsPrimitives } from "@/src/advertiser/domain/Advertiser";
import { NextApiRequest, NextApiResponse } from "next";
import httpMock, { MockRequest, MockResponse } from "node-mocks-http";

describe("On api/advertiser/create, GIVEN ....", () => {
  it("WHEN . . . ", async () => {
    const body: AdvertiserPropsPrimitives = {
      id: "string",
      name: "string",
      email: "string",
      password: "string",
      rol: "agency",
    };

    let req: MockRequest<NextApiRequest> = httpMock.createRequest({
      method: "POST",
      body,
    });
    let res: MockResponse<NextApiResponse> = httpMock.createResponse();

    await createAdvertiser(req, res);
    expect(res.statusCode).toBe(200)
  });
});
