import { getServerSideProps, IUserNamePage } from "@/pages/[userName]/index";
import httpMock, { MockRequest } from "node-mocks-http";
import { IVerificationEmailTimerPrimitives } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { TestVerificationEmailMongoDBRepo } from "../../../__mocks__/lib/modules/send-email-verification/infrastructure/TestVerificationEmailMongoDBRepo";
import { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { IGenericUserPrimitives } from "@/src/domain/IUser";
import { userSession } from "@/src/use-case/container";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { FakeUser } from "../../../__mocks__/lib/modules/user/FakeUser";
import { UniqId } from "@/src/utils/UniqId";
import { IUserPrimitives } from "@/src/modules/user/domain/User";
import { MockTestDB } from "../../../__mocks__/context/MockTestDB";
import { MockVerificationEmailDB } from "__mocks__/context/MockVerificationEmailDB";
import { MongoDB } from "@/src/infrastructure/MongoDB";

interface IServerSideResponse {
  props: {};
  redirect: { destination: string };
}

describe("On getServerSideProps LogIn, GIVEN some verification emails in MongoDB", () => {
  let verificationMock: MockVerificationEmailDB;
  let validVerificationEmails: IVerificationEmailTimerPrimitives[];
  let expiredVerificationEmail: IVerificationEmailTimerPrimitives;
  let req: MockRequest<NextApiRequest>;
  let res: MockRequest<NextApiResponse>;

  beforeAll(async () => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    const { mock, verificationEmails } = await MockTestDB.setAndInitAll();
    verificationMock = mock.verificationEmailsDB;
    validVerificationEmails = verificationEmails.valids;
    expiredVerificationEmail = verificationEmails.expired[0];
  }, 20000);

  it(`WHEN send an url with a not valid token, 
  THEN return redirect to home page '/'`, async () => {
    const resp = (await getServerSideProps({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: "fernandisco",
        email: validVerificationEmails[0].email,
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
        verificationToken: validVerificationEmails[0].id,
      },
    })) as IServerSideResponse;

    const verificationEmailFound = await verificationMock.findById(
      validVerificationEmails[0].id
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

    const verificationEmailFound = await verificationMock.findById(
      expiredVerificationEmail.id
    );

    expect(resp.redirect.destination).toBe("/");
    expect(verificationEmailFound).toBe(null);
  }, 12000);

  it(`WHEN send a req with a url with valid params, 
  THEN verification email should be removed, 
  new advertiser should be saved
  and return a valid JWT`, async () => {
    const emailVerificationEmail = validVerificationEmails[1].email;
    const verificationToken = validVerificationEmails[1].id;
    const nameVerificationEmail = faker.name.firstName();

    const resp = (await getServerSideProps({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: nameVerificationEmail,
        email: emailVerificationEmail,
        verificationToken: verificationToken,
      },
    })) as { props: { user: IGenericUserPrimitives } };

    const user = resp.props.user;

    const verificationEmailFound = await verificationMock.findById(
      verificationToken
    );

    expect(verificationEmailFound).toBe(null);
    expect(user.email).toBe(emailVerificationEmail);
    expect(user.name).toBe(nameVerificationEmail);
    expect(user.rol).not.toBe(null);
  }, 12000);
});

describe("On getServerSideProps WatchAd, GIVEN a user and some Active Campaigns", () => {
  let req: MockRequest<NextApiRequest>;
  let res: MockRequest<NextApiResponse>;
  let influencer: IUserPrimitives;
  let myUser: IUserPrimitives;

  beforeAll(async () => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    userSession.remove({ req, res });
    const { users } = await MockTestDB.setAndInitAll();
    influencer = users[0];
    myUser = FakeUser.createWithPrimitives(UniqId.generate());
  });

  it(`WHEN access to url without user session,
  THEN response should be all active campaigns`, async () => {
    const resp = (await getServerSideProps({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: influencer.name,
      },
    })) as { props: IUserNamePage };

    expect(resp.props.campaign).not.toBe(null);
    expect(resp.props.ad).not.toBe(null);
  });

  it(`WHEN access to my user name url,
  THEN response should be a null active campaign and ad`, async () => {
    userSession.remove({ req, res });
    userSession.setFromServer({ req, res }, myUser);

    const resp = (await getServerSideProps({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: myUser.name,
      },
    })) as { props: IUserNamePage };

    const userResponse: AdvertiserPropsPrimitives = resp.props.user;

    expect(userResponse.name).toEqual(myUser.name);
    expect(userResponse.id).toEqual(myUser.id);
    expect(userResponse.email).toEqual(myUser.email);
    expect(userResponse.rol).toEqual(myUser.rol);
    expect(resp.props.campaign).toBe(undefined);
    expect(resp.props.ad).toBe(undefined);
  });

  it(`WHEN access to an influencer url,
  THEN response should have an active campaign and ad`, async () => {
    userSession.remove({ req, res });
    userSession.setFromServer({ req, res }, myUser);
    const resp = (await getServerSideProps({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: influencer.name,
      },
    })) as { props: IUserNamePage };

    //console.log(resp.props.campaign)

    expect(resp.props.campaign).not.toBe(undefined);
    expect(resp.props.ad?.id).toBe(resp.props.campaign?.adId);
    expect(resp.props.user.id).toBe(myUser.id);
  });

  it(`WHEN access to a not existing influencer url,
  THEN response should return a redirect address`, async () => {
    userSession.remove({ req, res });
    userSession.setFromServer({ req, res }, myUser);
    const resp = (await getServerSideProps({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: faker.name.firstName(),
      },
    })) as IServerSideResponse;

    expect(resp.redirect).not.toBe(undefined);
  });
});
