import { getServerSideProps } from "@/pages/[userName]/index";
import httpMock, { MockRequest } from "node-mocks-http";
import { IVerificationEmailTimerPrimitives } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { FakeVerificationEmailTimer } from "../../../__mocks__/lib/mailing/send-email-verification/FakeVerificationEmailTimer";
import { TestVerificationEmailMongoDBRepo } from "../../../__mocks__/lib/mailing/send-email-verification/infrastructure/TestVerificationEmailMongoDBRepo";
import { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { IGenericUserPrimitives } from "@/src/domain/IUser";
import { IWatchAdData } from "@/src/controllers/WatchCampaignsController";
import { userSession } from "@/src/use-case/container";
import { TestCampaignMongoDBRepo } from "../../../__mocks__/lib/campaign/infrastructure/TestCampaignMongoDBRepo";
import { FakeCampaign } from "../../../__mocks__/lib/campaign/FakeCampaign";
import { UniqId } from "@/src/utils/UniqId";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";

interface IServerSideResponse {
  props: {};
  redirect: { destination: string };
}

//!: Mock VerificationEmail.remove, FindAdvertiser, CreateAdvertiser

describe("On getServerSideProps LogIn, GIVEN some verification emails in MongoDB", () => {
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
  new advertiser should be saved
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
    })) as { props: { user: IGenericUserPrimitives } };

    const user = resp.props.user;

    const verificationEmailFound = await verificationEmailRepo.findById(
      verificationToken
    );

    expect(verificationEmailFound).toBe(null);
    expect(user.email).toBe(verificationEmail);
    expect(user.name).toBe(verificationName);
    expect(user.rol).not.toBe(null);
  }, 12000);
});

//! TODO
describe("On getServerSideProps WatchAd, GIVEN a user and some Active Campaigns", () => {
  let req: MockRequest<NextApiRequest>;
  let res: MockRequest<NextApiResponse>;
  let activeCampaigns: ICampaignPrimitives[];

  beforeAll(async () => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    userSession.remove({ req, res });
    const campaignRepo = await TestCampaignMongoDBRepo.init();
    activeCampaigns = FakeCampaign.createManyWithPrimitives({
      status: CampaignStatusType.ACTIVE,
      amount: 5,
      advertiserId: UniqId.generate(),
    });
    await campaignRepo.saveMany(activeCampaigns);
  });

  it(`WHEN access to url without user session,
  THEN response should be all active campaigns`, async () => {
    const resp = (await getServerSideProps({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: faker.name.firstName(),
      },
    })) as { props: IWatchAdData };

    expect(resp.props.activeCampaigns).toEqual(activeCampaigns);
    expect(resp.props.user).toBe(null);
  }, 12000);

  //! TODO: ----
  it(`WHEN access to url with user session with rol type advertiser,
  THEN response should be ....`, async () => {
    const resp = (await getServerSideProps({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: faker.name.firstName(),
      },
    })) as { props: IWatchAdData };

    expect(resp.props.activeCampaigns).toEqual(activeCampaigns);
    expect(resp.props.user).toBe(null);
  }, 12000);
});
