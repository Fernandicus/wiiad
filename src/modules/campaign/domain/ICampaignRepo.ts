import { ICampaignPrimitives } from "./Campaign";

export interface ICampaignRepo {
  launch(campaign: ICampaignPrimitives): Promise<void>;
}
