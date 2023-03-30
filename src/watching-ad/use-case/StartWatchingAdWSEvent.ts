import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { IWatchingAdRepo } from "../domain/interface/IWatchingAdRepo";

export class StartWatchingAdWSEvent {
  constructor(private watchingAdRepo: IWatchingAdRepo) {}

  async start(refereeId: RefereeId): Promise<void> {
    await this.watchingAdRepo.startTimer(refereeId);
   /* const found = await this.watchingAdRepo.findAdByRefereeId(refereeId);
   found.match({
    some(ad) {
      ad.startTimer();
    },
    nothing() {
      throw new Error("User not found in the watching ads list");
    },
  }); */
  }
}
