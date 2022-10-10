import {
  getServerSideProps,
  IJWTProps,
  IUserNameSSPResponse,
} from "@/pages/[userName]/index";
import httpMock, { MockRequest } from "node-mocks-http";
import { IVerificationEmailTimerPrimitives } from "@/src/mailing/send-email-verification/domain/VerificationEmailTimer";
import { FakeVerificationEmailTimer } from "../../../__mocks__/lib/mailing/send-email-verification/FakeVerificationEmailTimer";
import { TestVerificationEmailMongoDBRepo } from "../../../__mocks__/lib/mailing/send-email-verification/infrastructure/TestVerificationEmailMongoDBRepo";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";

describe("On getServerSideProps, GIVEN some verification emails in MongoDB", () => {
  let mongoRepo: TestVerificationEmailMongoDBRepo;
  let verificationEmails: IVerificationEmailTimerPrimitives[];
  let expiredVerificationEmail: IVerificationEmailTimerPrimitives;
  let req: MockRequest<NextApiRequest>;
  let res: MockRequest<NextApiResponse>;

  beforeAll(async () => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    mongoRepo = await TestVerificationEmailMongoDBRepo.init();
    verificationEmails = FakeVerificationEmailTimer.createManyWithPrimitives(2);
    expiredVerificationEmail = FakeVerificationEmailTimer.createWithPrimitives({
      hasExpired: true,
    });
    await mongoRepo.saveMany([...verificationEmails, expiredVerificationEmail]);
  }, 8000);

  it(`WHEN send an url with a non existing token, 
  THEN return redirect to home page '/'`, async () => {
    const resp = (await getServerSideProps({
      req,
      res,
      resolvedUrl: "resolver_URL",
      params: { userName: "fernandisco" },
      query: { email: verificationEmails[0].email, token: "1234-1243-1234" },
    })) as { props: {}; redirect: string };

    expect(resp.redirect).toBe("/");
  });

  it(`WHEN send an url with an expired token, 
  THEN return redirect to home page '/' and verification email should be removed`, async () => {
    const resp = (await getServerSideProps({
      req,
      res,
      resolvedUrl: "resolver_URL",
      params: { userName: "fernandisco" },
      query: {
        email: expiredVerificationEmail.email,
        token: expiredVerificationEmail.id,
      },
    })) as { props: {}; redirect: string };

    const verificationEmailFound = await mongoRepo.findById(
      expiredVerificationEmail.id
    );

    expect(resp.redirect).toBe("/");
    expect(verificationEmailFound).toBe(null);
  });

  it(`WHEN send a req with the url with valid params of an existing verification email, 
  THEN verification email should be removed and return a valid JWT`, async () => {
    const verificationEmail = verificationEmails[0].email;
    const verificationToken = verificationEmails[0].id;
    const verificationName = faker.name.firstName();

    const resp = (await getServerSideProps({
      req,
      res,
      resolvedUrl: "",
      params: { userName: verificationName },
      query: {
        email: verificationEmail,
        token: verificationToken,
      },
    })) as IUserNameSSPResponse;

    const responseJWT = resp.props.jwt;
    const verificationEmailFound = await mongoRepo.findById(
      expiredVerificationEmail.id
    );

    expect(responseJWT).not.toBe(undefined);
    expect(verificationEmailFound).toBe(null);

    const token = jwt.decode(responseJWT) as IJWTProps;
    expect(token.email).toBe(verificationEmail);
    expect(token.userName).toBe(verificationName);
    expect(token.rol).not.toBe(null);
  });
});
