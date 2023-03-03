import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import { ErrorFindingCampaign } from "@/src/modules/campaign/domain/errors/ErrorFindingCampaign";
import { ICampaignRepo } from "@/src/modules/campaign/domain/interfaces/ICampaignRepo";
import {
  CampaignStatus,
  CampaignStatusType,
} from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { FindCampaign } from "@/src/modules/campaign/use-case/FindCampaign";
import { RemoveCampaign } from "@/src/modules/campaign/use-case/RemoveCampaign";
import { UniqId } from "@/src/utils/UniqId";
import { mockedCampaignsRepo } from "../../../../__mocks__/context/MockCampaignRepo";
import { FakeCampaign } from "../../../../__mocks__/lib/modules/campaign/FakeCampaign";

describe("On RemoveCampaign use case, GIVEN some campaigns", () => {
  let mockedRepo: ICampaignRepo;
  let removeCampaign: RemoveCampaign;
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

    removeCampaign = new RemoveCampaign(mockedRepo);
  });

  it(`WHEN call byAdId, 
  THEN repo method removeByAdId should be called with ad id`, async () => {
    const id = actives[0].adId;
    await removeCampaign.byAdId(id);
    expect(mockedRepo.removeByAdId).toBeCalledWith(id);
  });
});
