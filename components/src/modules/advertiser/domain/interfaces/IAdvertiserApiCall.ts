import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import { UniqId } from "@/src/utils/UniqId";

export interface IAdvertiserApiCall {
  getCampaigns(): Promise<Campaign[]>;
}
