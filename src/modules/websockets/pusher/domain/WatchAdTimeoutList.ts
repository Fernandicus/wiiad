import { UniqId } from "@/src/utils/UniqId";
import { WatchAdTimeout } from "./WatchAdTimeout";

export class WatchAdTimerList {
  readonly adsWatching: WatchAdTimeout[] = [];

  add(adTimer: WatchAdTimeout) {
    this.adsWatching.push(adTimer);
  }

  removeTimer(id: UniqId) {
    const index = this.adsWatching.findIndex((t) => t.userId.id === id.id);
    if (index === -1) return;
    this.removeAndClean(index);
  }

  isUserInTheList(userId: UniqId): boolean {
    const found = this.adsWatching.find((t) => t.userId.id === userId.id);
    if (!found) return false;
    return true;
  }

  private removeAndClean(index: number) {
    this.adsWatching[index].clearTimeOut();
    this.adsWatching.splice(index, 1);
  }
}
