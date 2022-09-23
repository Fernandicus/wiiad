import createAdvertiser from "@/pages/api/advertiser/create/index";
import {
  Advertiser,
  AdvertiserPropsPrimitives,
} from "@/src/advertiser/domain/Advertiser";
import { AdvertiserRolType } from "@/src/advertiser/domain/value-objects/AdvertiserRol";
import { NextApiRequest, NextApiResponse } from "next";
import httpMock, { MockRequest, MockResponse } from "node-mocks-http";
import { FakeAdvertiser } from "../../../../../__mocks__/lib/advertiser/FakeAdvertiser";

describe("On api/advertiser/create, GIVEN an Advertiser ", () => {
  let advertiser: AdvertiserPropsPrimitives;

  beforeAll(() => {
    advertiser = FakeAdvertiser.createPrimitives(AdvertiserRolType.BUSINESS);
  });

  it(`WHEN send a POST request with advertiser data,
  THEN response status code should be 200`, async () => {
    let req: MockRequest<NextApiRequest> = httpMock.createRequest({
      method: "POST",
      body: advertiser,
    });
    let res: MockResponse<NextApiResponse> = httpMock.createResponse();

    await createAdvertiser(req, res);
    expect(res.statusCode).toBe(200);
  });

  it(`WHEN send a GET request with advertiser data,
  THEN response status code should be 400`, async () => {
    let req: MockRequest<NextApiRequest> = httpMock.createRequest({
      method: "GET",
      body: advertiser,
    });
    let res: MockResponse<NextApiResponse> = httpMock.createResponse();

    await createAdvertiser(req, res);
    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send a POST request with empty advertiser data,
  THEN response status code should be 400`, async () => {
    let req: MockRequest<NextApiRequest> = httpMock.createRequest({
      method: "POST",
      body: {},
    });
    let res: MockResponse<NextApiResponse> = httpMock.createResponse();

    await createAdvertiser(req, res);
    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send a POST request with an advertiser rol of user,
  THEN response status code should be 400`, async () => {
    let req: MockRequest<NextApiRequest> = httpMock.createRequest({
      method: "POST",
      body: {...advertiser, rol: "user"},
    });
    let res: MockResponse<NextApiResponse> = httpMock.createResponse();

    await createAdvertiser(req, res);
    expect(res.statusCode).toBe(400);
  });
});
