import { UniqId } from "@/src/common/domain/UniqId";
import { Campaign } from "../domain/Campaign";
import { ErrorFindingCampaign } from "../domain/errors/ErrorFindingCampaign";
import { ICampaignRepo } from "../domain/interfaces/ICampaignRepo";
import { CampaignStatus } from "../domain/value-objects/CampaignStatus";

export class FindCampaign {
  constructor(private campaignRepo: ICampaignRepo) {}

  async allActives(): Promise<Campaign[]> {
    const activeCampaigns = await this.campaignRepo.findAllByStatus(
      CampaignStatus.active()
    );
    if (!activeCampaigns) throw ErrorFindingCampaign.byAllActives();
    return activeCampaigns;
  }

  async findAllByAdvertiserId(id: UniqId): Promise<Campaign[]> {
    const campaignsFound = await this.campaignRepo.findAllByAdvertiserId(id);
    if (!campaignsFound) throw ErrorFindingCampaign.byAdvertiserId(id.id);
    return campaignsFound;
  }

  async byId(id: UniqId): Promise<Campaign> {
    const campaignFound = await this.campaignRepo.byId(id);
    if (!campaignFound) throw ErrorFindingCampaign.byId(id.id);
    return campaignFound;
  }
}
