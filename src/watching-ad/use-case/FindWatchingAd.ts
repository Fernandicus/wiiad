import { Maybe } from "@/src/common/domain/Maybe";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { IWatchingAdRepo } from "../domain/interface/IWatchingAdRepo";
import { WatchingAdTimeout } from "../domain/WatchingAdTimeout";

export class FindWatchingAd {
  constructor(private watchingAdRepo: IWatchingAdRepo) {}

  async byRefereeId(refereeId: RefereeId): Promise<Maybe<WatchingAdTimeout>> {
    return await this.watchingAdRepo.findAdByRefereeId(refereeId);
  }
}
