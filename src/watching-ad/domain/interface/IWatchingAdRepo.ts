import { Maybe } from "@/src/common/domain/Maybe";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { WatchingAdTimeout } from "../WatchingAdTimeout";

export interface IWatchingAdRepo {
  add(adTimer: WatchingAdTimeout): Promise<void>;

  removeTimer(refereeId: RefereeId): Promise<void>;

  findAdByRefereeId(refereeId: RefereeId): Promise<Maybe<WatchingAdTimeout>>;

  startTimer(refereeId: RefereeId): Promise<void>;
}
