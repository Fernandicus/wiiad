import api_v1_FindCampagns from "@/pages/api/v1/campaign/index";
import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import { CampaignStatus } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import {
  autoSetTestCampaignDB,
  TestCampaignDB,
} from "../../../../__mocks__/lib/infrastructure/db/TestCampaignDB";
import { mockedContext } from "../../../../__mocks__/context/MockContext";
import { UniqId } from "@/src/utils/UniqId";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { FakeUser } from "../../../../__mocks__/lib/modules/user/FakeUser";
import { FakeAdvertiser } from "../../../../__mocks__/lib/modules/user/FakeAdvertiser";

describe("On api/v1/campaign/index, GIVEN some Campaigns", () => {
  let activeCampaigns: Campaign[] | null;
  let finisehdCampaigns: Campaign[] | null;
  let standByCampaigns: Campaign[] | null;
  let campaignsRepo: TestCampaignDB;

  beforeAll(async () => {
    campaignsRepo = await autoSetTestCampaignDB();
    activeCampaigns = await campaignsRepo.findByStatus(CampaignStatus.active());
    standByCampaigns = await campaignsRepo.findByStatus(
      CampaignStatus.standBy()
    );
    finisehdCampaigns = await campaignsRepo.findByStatus(
      CampaignStatus.finished()
    );
  });

  it(`WHEN send a not 'GET' request, 
    THEN status code should be 400`, async () => {
    const { req, res } = mockedContext({
      method: "POST",
    });

    await api_v1_FindCampagns(req, res);
    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send a 'GET' request without a session, 
    THEN status code should be 400`, async () => {
    const { req, res } = mockedContext({
      method: "GET",
    });

    await api_v1_FindCampagns(req, res);
    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send a 'GET' request with a session role User, 
    THEN status code should be 400`, async () => {
    const user = FakeUser.create(UniqId.new());
    const context = mockedContext({
      method: "GET",
    });

    userSession.setFromServer(context, user.toPrimitives());

    await api_v1_FindCampagns(context.req, context.res);
    expect(context.res.statusCode).toBe(400);
  });

  it(`WHEN send a 'GET' request with a session role Advertiser but without any campaign created, 
    THEN status code should be 400`, async () => {
    const advertiser = FakeAdvertiser.create();
    const context = mockedContext({
      method: "GET",
    });

    userSession.remove(context);
    userSession.setFromServer(context, advertiser.toPrimitives());

    await api_v1_FindCampagns(context.req, context.res);
    expect(context.res.statusCode).toBe(400);
  });

  it(`WHEN send a 'GET' request with  with campaigns created an user session role of Advertiser, 
    THEN status code should be 200 and response should contain an array of all the advertiser campaigns`, async () => {
    const advertiser = FakeAdvertiser.createWithId(
      finisehdCampaigns![0].advertiserId
    );
    const context = mockedContext({
      method: "GET",
    });

    userSession.remove(context);
    userSession.setFromServer(context, advertiser.toPrimitives());

    await api_v1_FindCampagns(context.req, context.res);
    const responseJSON = context.res._getData();
    const response = JSON.parse(responseJSON);

    const finisehdCampaignsPrimitives = finisehdCampaigns?.map((campaign) =>
      campaign.toPrimitives()
    );

    expect(context.res.statusCode).toBe(200);
    expect(response.campaigns).toEqual(finisehdCampaignsPrimitives);
  });
});
