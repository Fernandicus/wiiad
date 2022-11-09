import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import { ErrorFindingCampaign } from "@/src/modules/campaign/domain/ErrorFindingCampaign";
import { ICampaignRepo } from "@/src/modules/campaign/domain/ICampaignRepo";
import {
  CampaignStatus,
  CampaignStatusType,
} from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { FindCampaign } from "@/src/modules/campaign/use-case/FindCampaign";
import { UniqId } from "@/src/utils/UniqId";
import { FakeCampaign } from "../../../../__mocks__/lib/modules/campaign/FakeCampaign";

describe("On FindCampaign use case, GIVEN some active campaigns", () => {
  let mockedRepo: ICampaignRepo;
  let findCampaign: FindCampaign;
  let campaign: Campaign;

  beforeAll(async () => {
    campaign = FakeCampaign.create({
      status: CampaignStatusType.ACTIVE,
      advertiserId: UniqId.new(),
    });
    mockedRepo = {
      save: jest.fn(),
      findAllByAdvertiserId: jest.fn().mockImplementation((id: UniqId) => {
        if (id.id !== campaign.advertiserId.id) return null;
        return campaign;
      }),
      findAllByStatus: jest.fn().mockResolvedValue(campaign),
      addReferral: jest.fn(),
      byId: jest.fn().mockImplementation((id: UniqId) => {
        if (id.id !== campaign.id.id) return null;
        return campaign;
      }),
      increaseClicks: jest.fn(),
      increaseViews: jest.fn(),
    };
    findCampaign = new FindCampaign(mockedRepo);
  });

  it(`WHEN call findAllActives, THEN repo method findAllByStatus should be called with CampaignStatus active`, async () => {
    await findCampaign.allActives();
    expect(mockedRepo.findAllByStatus).toBeCalledWith(CampaignStatus.active());
  });

  it(`WHEN call byId, THEN repo method byId should be called with id`, async () => {
    await findCampaign.byId(campaign.id);
    expect(mockedRepo.byId).toBeCalledWith(campaign.id);
  });

  it(`WHEN call byId for a not existing id, THEN an ErrorFindingCampaign should be thrown`, async () => {
    expect(findCampaign.byId(UniqId.new())).rejects.toThrowError(
      ErrorFindingCampaign
    );
  });

  it(`WHEN call findAllByAdvertiserId, THEN repo method findAllByAdvertiserId should be called with advertiserId`, async () => {
    await findCampaign.findAllByAdvertiserId(campaign.advertiserId);
    expect(mockedRepo.findAllByAdvertiserId).toBeCalledWith(
      campaign.advertiserId
    );
  });

  it(`WHEN call findAllByAdvertiserId for a not existing advertiser id,  THEN an ErrorFindingCampaign should be thrown`, async () => {
    expect(
      findCampaign.findAllByAdvertiserId(UniqId.new())
    ).rejects.toThrowError(ErrorFindingCampaign);
  });
});
