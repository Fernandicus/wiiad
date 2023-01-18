import { IProfilePageParams } from "@/components/ui/pages/profile/UserProfilePage";
import { getServerSideProps as profilePage } from "@/pages/profile";
import { LogStates } from "@/src/common/domain/LogStates";
import { IVerificationEmailData } from "@/src/modules/mailing/send-email-verification/domain/interfaces/IVerificationEmailData";
import { createAuthTokenHandler } from "@/src/modules/mailing/send-email-verification/infrastructure/email-verification-container";
import { User } from "@/src/modules/users/user/domain/User";
import { faker } from "@faker-js/faker";
import { NextApiRequest, NextApiResponse } from "next";
import httpMock, { MockRequest } from "node-mocks-http";
import { TestDBs } from "../../../__mocks__/lib/infrastructure/db/TestDBs";

interface IServerSideResponse {
  props: {};
  redirect: { destination: string };
}

describe("IN ProfilePage, GIVEN some verification emails in MongoDB", () => {
  let req: MockRequest<NextApiRequest>;
  let res: MockRequest<NextApiResponse>;
  let user: User;

  beforeAll(async () => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    const mockTest = await TestDBs.setAndInitAll();
    user = mockTest.users[0];
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
    const payload: IVerificationEmailData = {
      email: user.email.email,
      role: user.role.role,
      userName: user.name.name,
    };
    const expiredToken = createAuthTokenHandler.jwtExpiresIn(payload, 0);
    const resp = (await profilePage({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: faker.name.firstName(),
        authToken: expiredToken.token,
        log: LogStates.LogIn,
      },
    })) as IServerSideResponse;

    expect(resp.redirect.destination).toBe("/");
  }, 12000);

  it(`WHEN send a req with a url with valid params, 
    THEN verification email should be removed, 
    new advertiser should be saved
    and return a valid JWT`, async () => {
    const payload: IVerificationEmailData = {
      email: user.email.email,
      role: user.role.role,
      userName: user.name.name,
    };

    const validToken = createAuthTokenHandler.jwtExpiresIn15Min(payload);

    const nameVerificationEmail = faker.name.firstName();

    const resp = (await profilePage({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: nameVerificationEmail,
        authToken: validToken.token,
        log: LogStates.SignUp,
      },
    })) as { props: IProfilePageParams };

    const userData = resp.props.user;
    expect(userData).not.toBe(undefined);
  }, 12000);
});
