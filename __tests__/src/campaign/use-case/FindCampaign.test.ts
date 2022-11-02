import { ICampaignRepo } from "@/src/modules/campaign/domain/ICampaignRepo";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { FindCampaign } from "@/src/modules/campaign/use-case/FindCampaign";

describe("On FindCampaign use case, GIVEN some active campaigns", () => {
  let mockedRepo: ICampaignRepo;

  beforeAll(async () => {
    mockedRepo = {
      save: jest.fn(),
      findAllByAdvertiserId: jest.fn(),
      findByStatus: jest.fn().mockResolvedValue([]),
      addReferral: jest.fn(),
      byId: jest.fn(),
      increaseClicks:jest.fn(),
      increaseViews:jest.fn(),
    };
  });

  it(`WHEN call findAllActives, THEN return all the saved campaigns`, async () => {
    const findCampaign = new FindCampaign(mockedRepo);
    await findCampaign.allActives();
    expect(mockedRepo.findByStatus).toBeCalledWith(CampaignStatusType.ACTIVE);
  });
});
