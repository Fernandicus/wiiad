import { Maybe } from "@/src/common/domain/Maybe";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { UniqId } from "@/src/common/domain/UniqId";
import { WatchAdTimeout } from "./WatchAdTimeout";

export class WatchAdTimerList {
  readonly adsWatching: WatchAdTimeout[] = [];

  add(adTimer: WatchAdTimeout) {
    if (this.isUserInTheList(adTimer.refereeId)) {
      this.removeTimer(adTimer.refereeId);
    }
    this.adsWatching.push(adTimer);
  }

  removeTimer(refereeId: RefereeId) {
    const index = this.adsWatching.findIndex((t) => t.refereeId.uniqId === refereeId.uniqId);
    if (index === -1) return;
    this.removeAndClean(index);
  }

  isUserInTheList(refereeId: RefereeId): boolean {
    const found = this.adsWatching.find((t) => t.refereeId.uniqId === refereeId.uniqId);
    if (!found) return false;
    return true;
  }

  findAdByRefereeId(refereeId: RefereeId): Maybe<WatchAdTimeout> {
    const adFound = this.adsWatching.find((ad) => ad.refereeId.uniqId === refereeId.uniqId);
    if (!adFound) return Maybe.nothing();
    return Maybe.some(adFound);
  }

  private removeAndClean(index: number) {
    this.adsWatching[index].clearTimeOut();
    this.adsWatching.splice(index, 1);
  }
}
