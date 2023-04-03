import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import { ErrorFindingCampaign } from "@/src/modules/campaign/domain/errors/ErrorFindingCampaign";
import { ICampaignRepo } from "@/src/modules/campaign/domain/interfaces/ICampaignRepo";
import {
  CampaignStatus,
  CampaignStatusType,
} from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { FindCampaign } from "@/src/modules/campaign/use-case/FindCampaign";
import { UniqId } from "@/src/common/domain/UniqId";
import { mockedCampaignsRepo } from "../../../../__mocks__/context/MockCampaignRepo";
import { FakeCampaign } from "../../../../__mocks__/lib/modules/campaign/FakeCampaign";

describe("On FindCampaign use case, GIVEN some active campaigns", () => {
  let mockedRepo: ICampaignRepo;
  let findCampaign: FindCampaign;
  let campaign: Campaign;
  let actives: Campaign[];

  beforeAll(async () => {
    actives = FakeCampaign.createMany({
      advertiserId: UniqId.new(),
      amount: 2,
      status: CampaignStatusType.ACTIVE,
    });
    const standby = FakeCampaign.createMany({
      advertiserId: UniqId.new(),
      amount: 1,
      status: CampaignStatusType.STAND_BY,
    });
    const finished = FakeCampaign.createMany({
      advertiserId: UniqId.new(),
      amount: 3,
      status: CampaignStatusType.FINISHED,
    });

    campaign = actives[0];
    const campaigns = [...actives, ...finished, ...standby, campaign];

    mockedRepo = mockedCampaignsRepo(campaigns);

    findCampaign = new FindCampaign(mockedRepo);
  });

  it(`WHEN call findAllActives, 
  THEN repo method findAllByStatus should be called with CampaignStatus active`, async () => {
    const found = await findCampaign.allActives();
    expect(mockedRepo.findAllByStatus).toBeCalledWith(CampaignStatus.active());
  });

  it(`WHEN call byId, THEN repo method byId should be called with id`, async () => {
    await findCampaign.byId(campaign.id);
    expect(mockedRepo.byId).toBeCalledWith(campaign.id);
  });

  it(`WHEN call byId for a not existing id, 
  THEN an ErrorFindingCampaign should be thrown`, async () => {
    expect(findCampaign.byId(UniqId.new())).rejects.toThrowError(
      ErrorFindingCampaign
    );
  });

  it(`WHEN call findAllByAdvertiserId, 
  THEN repo method findAllByAdvertiserId should be called with advertiserId`, async () => {
    await findCampaign.findAllByAdvertiserId(campaign.advertiserId);
    expect(mockedRepo.findAllByAdvertiserId).toBeCalledWith(
      campaign.advertiserId
    );
  });

  it(`WHEN call findAllByAdvertiserId for a not existing advertiser id,
  THEN an ErrorFindingCampaign should be thrown`, async () => {
    expect(
      findCampaign.findAllByAdvertiserId(UniqId.new())
    ).rejects.toThrowError(ErrorFindingCampaign);
  });
});
