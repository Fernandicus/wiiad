import { getServerSideProps, IUserNamePage } from "@/pages/[userName]/index";
import httpMock, { MockRequest } from "node-mocks-http";
import { IVerificationEmailTimerPrimitives } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { FakeVerificationEmailTimer } from "../../../__mocks__/lib/mailing/send-email-verification/FakeVerificationEmailTimer";
import { TestVerificationEmailMongoDBRepo } from "../../../__mocks__/lib/mailing/send-email-verification/infrastructure/TestVerificationEmailMongoDBRepo";
import { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { IGenericUserPrimitives } from "@/src/domain/IUser";
import { IWatchCampaignData } from "@/src/controllers/WatchCampaignsController";
import { userSession } from "@/src/use-case/container";
import { TestCampaignMongoDBRepo } from "../../../__mocks__/lib/campaign/infrastructure/TestCampaignMongoDBRepo";
import { FakeCampaign } from "../../../__mocks__/lib/campaign/FakeCampaign";
import { UniqId } from "@/src/utils/UniqId";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { FakeAdvertiser } from "../../../__mocks__/lib/advertiser/FakeAdvertiser";
import { RolType } from "@/src/domain/Rol";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { TestAdMongoDBRepository } from "../../../__mocks__/lib/ads/infraestructure/TestAdMongoDBRepository";
import { FakeAd } from "../../../__mocks__/lib/ads/FakeAd";
import { AdModelProps } from "@/src/modules/ad/infraestructure/AdModel";

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
    const advertiser = FakeAdvertiser.createPrimitives(RolType.BUSINESS);
    const campaignRepo = await TestCampaignMongoDBRepo.init();
    const adsRepo = await TestAdMongoDBRepository.init();
    const ads = FakeAd.createManyWithPrimitives(advertiser.id, 5);
    activeCampaigns = FakeCampaign.createManyFromGivenAds(
      ads,
      CampaignStatusType.ACTIVE
    );
    await campaignRepo.saveMany(activeCampaigns);
    const adsModels = ads.map((ad): AdModelProps => {
      return {
        _id: ad.id,
        advertiserId: ad.advertiserId,
        description: ad.description,
        image: ad.image,
        redirectionUrl: ad.redirectionUrl,
        segments: ad.segments,
        title: ad.title,
      };
    });
    await adsRepo.saveMany(adsModels);
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
    })) as { props: IUserNamePage };

    expect(resp.props.campaign).not.toBe(null);
    expect(resp.props.ad).not.toBe(null);
  });

  //! TODO: SAVE USER SESSION AND TRY TO ENTER TO THE SAME USER NAME URL
  it.only(`WHEN access to the url with my user session name,
  THEN response should be a null active campaign and ad`, async () => {
    const user = {
      email: faker.internet.email(),
      name: faker.name.firstName(),
      id: "2134",
      rol: RolType.USER,
    };
    userSession.remove({ req, res });
    userSession.setFromServer({ req, res }, user);
    const resp = (await getServerSideProps({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: user.name,
      },
    })) as { props: IUserNamePage };

    const userResponse: AdvertiserPropsPrimitives = resp.props.user;

    expect(userResponse.name).toEqual(user.name);
    expect(userResponse.id).toEqual(user.id);
    expect(userResponse.email).toEqual(user.email);
    expect(userResponse.rol).toEqual(user.rol);
    expect(resp.props.campaign).toBe(undefined);
    expect(resp.props.ad).toBe(undefined);
  });

  //! TODO: SAVE USER SESSION AND TRY TO ENTER TO THE SAME USER NAME URL
  it.only(`WHEN access to the url with other user session name,
  THEN response should have an active campaign and ad`, async () => {
    const user = {
      email: faker.internet.email(),
      name: faker.name.firstName(),
      id: "2134",
      rol: RolType.USER,
    };
    userSession.remove({ req, res });
    userSession.setFromServer({ req, res }, user);
    const resp = (await getServerSideProps({
      req,
      res,
      resolvedUrl: "",
      params: {},
      query: {
        userName: faker.name.firstName(),
      },
    })) as { props: IUserNamePage };

    expect(resp.props.campaign).not.toBe(undefined);
    expect(resp.props.ad?.id).toBe(resp.props.campaign?.adId);
  });
});
