import { UniqId } from "@/src/utils/UniqId";
import { Campaign, ICampaignPrimitives } from "../domain/Campaign";
import { ErrorFindingCampaign } from "../domain/ErrorFindingCampaign";
import { ICampaignRepo } from "../domain/ICampaignRepo";
import { CampaignStatusType } from "../domain/value-objects/CampaignStatus";
import { FindCampaign } from "../use-case/FindCampaign";

export class FindCampaignHandler {
  constructor(private findCampaign: FindCampaign) {}

  async allActives(): Promise<ICampaignPrimitives[]> {
    const activeCampaigns = await this.findCampaign.allActives();
    if (!activeCampaigns)
      throw new ErrorFindingCampaign("There are no active campaigns");
    const campaigns = this.mapToCampaignsPrimitives(activeCampaigns);
    return campaigns;
  }

  async byAdvertiserId(id: string): Promise<ICampaignPrimitives[]> {
    const uniqId = new UniqId(id);
    const campaignsFound = await this.findCampaign.findAllByAdvertiserId(
      uniqId
    );
    const campaigns = this.mapToCampaignsPrimitives(campaignsFound);
    return campaigns;
  }

  async byId(id:string):Promise<ICampaignPrimitives>{
    const uniqId = new UniqId(id)
    const campaignFound = await this.findCampaign.byId(uniqId);
    if (!campaignFound) throw new ErrorFindingCampaign(`No campaign found for the id ${id}`);
    return campaignFound.toPrimitives();
  }

  private mapToCampaignsPrimitives(
    campaigns: Campaign[]
  ): ICampaignPrimitives[] {
    return campaigns.map((campaign): ICampaignPrimitives => {
      return campaign.toPrimitives();
    });
  }
}
