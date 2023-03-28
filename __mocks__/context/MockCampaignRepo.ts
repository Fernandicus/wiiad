import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import { ICampaignRepo } from "@/src/modules/campaign/domain/interfaces/ICampaignRepo";
import { CampaignStatus } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { UniqId } from "@/src/common/domain/UniqId";

export const mockedCampaignsRepo = (campaigns: Campaign[]): ICampaignRepo => {
  return {
    save: jest.fn(),
    removeByAdId: jest.fn(),
    findAllByAdvertiserId: jest
      .fn()
      .mockImplementation((id: UniqId): Campaign[] | null => {
        const campaignsFound = campaigns.filter(
          (campaign) => campaign.advertiserId.id == id.id
        );
        if (campaignsFound.length == 0) return null;
        return campaignsFound;
      }),
    byId: jest.fn().mockImplementation((id: UniqId): Campaign | null => {
      const campaignFound = campaigns.find(
        (campaign) => campaign.id.id == id.id
      );
      if (!campaignFound) return null;
      return campaignFound;
    }),
    findAllByStatus: jest
      .fn()
      .mockImplementation((status: CampaignStatus): Campaign[] | null => {
        const campaignFound = campaigns.filter(
          (campaign) => campaign.status.status == status.status
        );
        if (campaignFound.length == 0) return null;
        return campaignFound;
      }),
    addReferral: jest.fn(),
    increaseClicks: jest.fn(),
    increaseViews: jest.fn(),
  };
};
