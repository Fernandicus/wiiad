import { getServerSideProps as watchAdsPage, IWatchCampaignPage } from "@/pages/[userName]/index";
import { getServerSideProps as profilePage, IUserProfilePage } from "@/pages/profile";
import httpMock, { MockRequest } from "node-mocks-http";
import { VerificationEmail } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmail";
import { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { userSession } from "@/src/use-case/container";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { FakeUser } from "../../../__mocks__/lib/modules/user/FakeUser";
import { UniqId } from "@/src/utils/UniqId";
import { IUserPrimitives, User } from "@/src/modules/user/domain/User";
import { TestDBs } from "../../../__mocks__/lib/infrastructure/db/TestDBs";
import { TestVerificationEmailDB } from "__mocks__/lib/infrastructure/db/TestVerificationEmailDB";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { IGenericUserPrimitives } from "@/src/domain/GenericUser";

interface IServerSideResponse {
  props: {};
  redirect: { destination: string };
}

describe("On getServerSideProps LogIn, GIVEN some verification emails in MongoDB", () => {
  let verificationMock: TestVerificationEmailDB;
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
    verificationMock = mockTest.mocks.verificationEmailsDB;
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
      },
    })) as { props: IUserProfilePage };

    const user = resp.props.user;

    const verificationEmailFound = await verificationMock.findById(
      verificationEmail.id
    );

    expect(verificationEmailFound).toBe(null);
    expect(user).not.toBe(undefined); 
  }, 12000);
});

describe("On getServerSideProps WatchAd, GIVEN a user and some Active Campaigns", () => {
  let req: MockRequest<NextApiRequest>;
  let res: MockRequest<NextApiResponse>;
  let influencer: User;
  let myUser: IUserPrimitives;

  beforeAll(async () => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    userSession.remove({ req, res });
    const { users } = await TestDBs.setAndInitAll();
    influencer = users[0];
    myUser = FakeUser.createWithPrimitives(UniqId.generate());
  });

  it(`WHEN access to url without user session,
  THEN response should be all active campaigns`, async () => {

    const resp = (await watchAdsPage({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: influencer.name.name,
      },
    })) as { props: IWatchCampaignPage };

    
    expect(resp.props.campaign).not.toBe(null);
    expect(resp.props.ad).not.toBe(null);
  });

  it(`WHEN access to my user name url,
  THEN response should be a null active campaign and ad`, async () => {
    userSession.remove({ req, res });
    userSession.setFromServer({ req, res }, myUser);

    const resp = (await watchAdsPage({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: myUser.name,
      },
    })) as { props: IWatchCampaignPage };

    const userResponse: IGenericUserPrimitives | null = resp.props.user;

    expect(userResponse?.name).toEqual(myUser.name);
    expect(userResponse?.id).toEqual(myUser.id);
    expect(userResponse?.email).toEqual(myUser.email);
    expect(userResponse?.role).toEqual(myUser.role);
    expect(resp.props.campaign).toBe(undefined);
    expect(resp.props.ad).toBe(undefined);
  });

  it(`WHEN access to an influencer url,
  THEN response should have an active campaign and ad`, async () => {
    userSession.remove({ req, res });
    userSession.setFromServer({ req, res }, myUser);
    const resp = (await watchAdsPage({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: influencer.name.name,
      },
    })) as { props: IWatchCampaignPage };

    const campaign = resp.props.campaign as ICampaignPrimitives;
    const ad = resp.props.ad as AdPropsPrimitives;
    const user = resp.props.user as IUserPrimitives;
    const referrer = resp.props.referrer as IGenericUserPrimitives;

    expect(campaign).not.toBe(undefined);
    expect(ad.id).toBe(campaign.adId);
    expect(user.id).toBe(myUser.id);
    expect(referrer.id).toBe(influencer.id.id);
  });

  it(`WHEN access to a not existing influencer url,
  THEN response should return a redirect address`, async () => {
    userSession.remove({ req, res });
    userSession.setFromServer({ req, res }, myUser);
    const resp = (await watchAdsPage({
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
