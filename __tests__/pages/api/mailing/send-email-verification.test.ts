import { NextApiRequest, NextApiResponse } from "next";
import httpMock, { MockRequest, MockResponse } from "node-mocks-http";
import sendEmailVerification, {
  ISendVerificationEmailBodyRequest,
} from "@/pages/api/mailing/send-email-verification";
import { faker } from "@faker-js/faker";
import { TestVerificationEmailMongoDBRepo } from "../../../../__mocks__/lib/mailing/send-email-verification/infrastructure/TestVerificationEmailMongoDBRepo";
import { RolType } from "@/src/domain/Rol";

describe("On api/mailing/send-email-verification, GIVEN an user", () => {
  let user: ISendVerificationEmailBodyRequest;
  beforeAll(async () => {
    await TestVerificationEmailMongoDBRepo.init();
    user = {
      email: faker.internet.email(),
      userName: faker.name.firstName(),
      rol: RolType.USER,
    };
  }, 8000);

  it(`WHEN send POST request with all the required data,
  THEN return status code 200`, async () => {
    const request: MockRequest<NextApiRequest> = httpMock.createRequest({
      method: "POST",
      body: user,
    });
    const response: MockResponse<NextApiResponse> = httpMock.createResponse();

    await sendEmailVerification(request, response);

    expect(response.statusCode).toBe(200);
  }, 8000);

  it(`WHEN send GET request, 
  THEN return status code 400`, async () => {
    const request: MockRequest<NextApiRequest> = httpMock.createRequest({
      method: "GET",
      body: user,
    });
    const response: MockResponse<NextApiResponse> = httpMock.createResponse();

    await sendEmailVerification(request, response);

    expect(response.statusCode).toBe(400);
  });

  it(`WHEN send POST request without the required data, 
  THEN return status code 400`, async () => {
    const request: MockRequest<NextApiRequest> = httpMock.createRequest({
      method: "POST",
      body: { userName: user.userName },
    });
    const response: MockResponse<NextApiResponse> = httpMock.createResponse();

    await sendEmailVerification(request, response);

    expect(response.statusCode).toBe(400);
  });
});
