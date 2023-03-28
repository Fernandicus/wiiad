import { UniqId } from "@/src/common/domain/UniqId";
import { ICampaignRepo } from "../domain/interfaces/ICampaignRepo";

export class RemoveCampaign {
  constructor(private repo: ICampaignRepo) {}

  async byAdId(adId:UniqId):Promise<void>{
    await this.repo.removeByAdId(adId);
  }
}
