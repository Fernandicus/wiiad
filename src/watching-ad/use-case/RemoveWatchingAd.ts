import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { IWatchingAdRepo } from "../domain/interface/IWatchingAdRepo";

export class RemoveWatchingAd {
  constructor(private watchingAdRepo: IWatchingAdRepo) {}

  async byRefereeId(refereeId:RefereeId):Promise<void>{
    await this.watchingAdRepo.removeByRefereeId(refereeId);
  }
}
