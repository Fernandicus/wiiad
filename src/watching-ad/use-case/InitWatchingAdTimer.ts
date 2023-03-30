import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { IWatchingAdRepo } from "../domain/interface/IWatchingAdRepo";

export class InitWatchingAdTimer {
  constructor(private watchingAdRepo: IWatchingAdRepo) {}

  async start(refereeId: RefereeId): Promise<void> {
    await this.watchingAdRepo.startTimer(refereeId);
  }
}
