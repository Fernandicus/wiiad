import { UniqId } from "@/src/common/domain/UniqId";
import { Campaign, ICampaignPrimitives } from "../../domain/Campaign";
import { FindCampaign } from "../FindCampaign";

export class FindCampaignHandler {
  constructor(private findCampaign: FindCampaign) {}

  async allActives(): Promise<ICampaignPrimitives[]> {
    const activeCampaigns = await this.findCampaign.allActives();
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
