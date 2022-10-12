import { getServerSideProps, ILogInSSR } from "@/pages/[userName]/index";
import httpMock, { MockRequest } from "node-mocks-http";
import { IVerificationEmailTimerPrimitives } from "@/src/mailing/send-email-verification/domain/VerificationEmailTimer";
import { FakeVerificationEmailTimer } from "../../../__mocks__/lib/mailing/send-email-verification/FakeVerificationEmailTimer";
import { TestVerificationEmailMongoDBRepo } from "../../../__mocks__/lib/mailing/send-email-verification/infrastructure/TestVerificationEmailMongoDBRepo";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";
import { AdvertiserPropsPrimitives } from "@/src/advertiser/domain/Advertiser";
import { AdvertiserRepo } from "@/src/advertiser/domain/AdvertiserRepo";

interface IServerSideResponse {
  props: {};
  redirect: { destination: string };
}

//!: Mock VerificationEmail.remove, FindAdvertiser, CreateAdvertiser

describe("On getServerSideProps, GIVEN some verification emails in MongoDB", () => {
  let verificationEmailRepo: TestVerificationEmailMongoDBRepo;
  let verificationEmails: IVerificationEmailTimerPrimitives[];
  let expiredVerificationEmail: IVerificationEmailTimerPrimitives;
  let req: MockRequest<NextApiRequest>;
  let res: MockRequest<NextApiResponse>;

  beforeAll(async () => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    verificationEmailRepo = await TestVerificationEmailMongoDBRepo.init();
    verificationEmails = FakeVerificationEmailTimer.createManyWithPrimitives(3);
    expiredVerificationEmail = FakeVerificationEmailTimer.createWithPrimitives({
      hasExpired: true,
    });
    await verificationEmailRepo.saveMany([
      ...verificationEmails,
      expiredVerificationEmail,
    ]);
  }, 8000);

  it(`WHEN send an url with a not valid token, 
  THEN return redirect to home page '/'`, async () => {
    const resp = (await getServerSideProps({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: "fernandisco",
        email: verificationEmails[0].email,
        verificationToken: "1234-1243-1234",
      },
    })) as IServerSideResponse;

    expect(resp.redirect.destination).toBe("/");
  }, 12000);

  it(`WHEN send an url with a not valid email, 
  THEN return redirect to home page '/' and verification email should be removed`, async () => {
    const resp = (await getServerSideProps({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: "fernandisco",
        email: faker.internet.email(),
        verificationToken: verificationEmails[0].id,
      },
    })) as IServerSideResponse;

    const verificationEmailFound = await verificationEmailRepo.findById(
      verificationEmails[0].id
    );

    expect(resp.redirect.destination).toBe("/");
    expect(verificationEmailFound).toBe(null);
  }, 12000);

  it(`WHEN send an url with an expired token, 
  THEN return redirect to home page '/' and verification email should be removed`, async () => {
    const resp = (await getServerSideProps({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: faker.name.firstName(),
        email: expiredVerificationEmail.email,
        verificationToken: expiredVerificationEmail.id,
      },
    })) as IServerSideResponse;

    const verificationEmailFound = await verificationEmailRepo.findById(
      expiredVerificationEmail.id
    );

    expect(resp.redirect.destination).toBe("/");
    expect(verificationEmailFound).toBe(null);
  }, 12000);

  it(`WHEN send a req with a url with valid params, 
  THEN verification email should be removed, 
  advertiser should be saved
  and return a valid JWT`, async () => {
    const verificationEmail = verificationEmails[1].email;
    const verificationToken = verificationEmails[1].id;
    const verificationName = faker.name.firstName();

    const resp = (await getServerSideProps({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: verificationName,
        email: verificationEmail,
        verificationToken: verificationToken,
      },
    })) as ILogInSSR;

    const responseJWT = resp.props.jwt;
    const user = resp.props.user;

    const verificationEmailFound = await verificationEmailRepo.findById(
      verificationToken
    );

    expect(responseJWT).not.toBe(undefined);
    expect(verificationEmailFound).toBe(null);
    expect(user.email).toBe(verificationEmail);
    expect(user.name).toBe(verificationName);
    expect(user.rol).not.toBe(null);
  }, 12000);
});
