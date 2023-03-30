import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { IWatchingAdRepo } from "../domain/interface/IWatchingAdRepo";

export class StartWatchingAd {
  constructor(private watchingAdRepo: IWatchingAdRepo) {}

  async start(refereeId: RefereeId): Promise<void> {
    await this.watchingAdRepo.startTimer(refereeId);
  }
}
