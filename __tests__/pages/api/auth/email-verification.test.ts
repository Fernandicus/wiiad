import { NextApiRequest, NextApiResponse } from "next";
import httpMock, { MockRequest, MockResponse } from "node-mocks-http";
import signUp, {
  IVerificationTokenBodyRequest,
} from "@/pages/api/auth/email-verification";

describe("On api/auth/sign-up, GIVEN an user", () => {
  let user: IVerificationTokenBodyRequest;
  beforeAll(() => {
    user = { email: "test@test.com", userName: "fernandisco" };
  });

  it(`WHEN send POST request with all the required data,
  THEN return status code 200`, async () => {
    const request: MockRequest<NextApiRequest> = httpMock.createRequest({
      method: "POST",
      body: user,
    });
    const response: MockResponse<NextApiResponse> = httpMock.createResponse();

    await signUp(request, response);

    expect(response.statusCode).toBe(200);
  });

  it(`WHEN send GET request, 
  THEN return status code 400`, async () => {
    const request: MockRequest<NextApiRequest> = httpMock.createRequest({
      method: "GET",
      body: user,
    });
    const response: MockResponse<NextApiResponse> = httpMock.createResponse();

    await signUp(request, response);

    expect(response.statusCode).toBe(400);
  });

  it(`WHEN send POST request without the required data, 
  THEN return status code 400`, async () => {
    const request: MockRequest<NextApiRequest> = httpMock.createRequest({
      method: "POST",
      body: {userName: user.userName},
    });
    const response: MockResponse<NextApiResponse> = httpMock.createResponse();

    await signUp(request, response);

    expect(response.statusCode).toBe(400);
  });
});
