import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";

export interface IUserProfilePage {
  user: IUserPrimitives;
  campaigns: ICampaignPrimitives[] | null;
  ads: AdPropsPrimitives[] | null;
}
