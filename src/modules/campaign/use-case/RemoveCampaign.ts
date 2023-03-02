import { UniqId } from "@/src/utils/UniqId";
import { ICampaignRepo } from "../domain/interfaces/ICampaignRepo";

export class RemoveCampaign {
  constructor(private repo: ICampaignRepo) {}

  async byAdId(adId:UniqId):Promise<void>{
    await this.repo.removeByAdId(adId);
  }
}
