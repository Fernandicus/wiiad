import {
  getServerSideProps as profilePage,
  IUserProfilePage,
} from "@/pages/profile";
import { LogStates } from "@/src/common/domain/LogStates";
import { VerificationEmail } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmail";
import { User } from "@/src/modules/users/user/domain/User";
import { faker } from "@faker-js/faker";
import { NextApiRequest, NextApiResponse } from "next";
import httpMock, { MockRequest } from "node-mocks-http";
import { TestDBs } from "../../../__mocks__/lib/infrastructure/db/TestDBs";
import { TestVerificationEmailDB } from "../../../__mocks__/lib/infrastructure/db/TestVerificationEmailDB";

interface IServerSideResponse {
  props: {};
  redirect: { destination: string };
}

describe("IN ProfilePage, GIVEN some verification emails in MongoDB", () => {
  let testVerficationEmailDB: TestVerificationEmailDB;
  let validVerificationEmails: VerificationEmail[];
  let expiredVerificationEmail: VerificationEmail;
  let req: MockRequest<NextApiRequest>;
  let res: MockRequest<NextApiResponse>;
  let user: User;

  beforeAll(async () => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    const mockTest = await TestDBs.setAndInitAll();
    user = mockTest.users[0];
    testVerficationEmailDB = mockTest.dbs.verificationEmailsDB;
    validVerificationEmails = mockTest.verificationEmails.valids;
    expiredVerificationEmail = mockTest.verificationEmails.expired[0];
  }, 20000);

  it(`WHEN send an url with a not valid token, 
    THEN return redirect to home page '/'`, async () => {
    const resp = (await profilePage({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: "fernandisco",
        authToken: "1234-1243-1234",
      },
    })) as IServerSideResponse;

    expect(resp.redirect.destination).toBe("/");
  }, 12000);

  it(`WHEN send an url with an expired token, 
    THEN return redirect to home page '/' and verification email should be removed`, async () => {
    const resp = (await profilePage({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: faker.name.firstName(),
        authToken: expiredVerificationEmail.authToken.token,
        log: LogStates.LogIn,
      },
    })) as IServerSideResponse;

    const verificationEmailFound = await testVerficationEmailDB.findById(
      expiredVerificationEmail.id
    );
    console.log(resp);
    console.log(verificationEmailFound);

    expect(resp.redirect.destination).toBe("/");
    expect(verificationEmailFound).toBe(null);
  }, 12000);

  it(`WHEN send a req with a url with valid params, 
    THEN verification email should be removed, 
    new advertiser should be saved
    and return a valid JWT`, async () => {
    const verificationEmail = validVerificationEmails[1];
    const authToken = verificationEmail.authToken.token;
    const nameVerificationEmail = faker.name.firstName();

    const resp = (await profilePage({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: nameVerificationEmail,
        authToken,
        log: LogStates.SignUp,
      },
    })) as { props: IUserProfilePage };

    const user = resp.props.user;

    const verificationEmailFound = await testVerficationEmailDB.findById(
      verificationEmail.id
    );

    expect(verificationEmailFound).toBe(null);
    expect(user).not.toBe(undefined);
  }, 12000);
});
