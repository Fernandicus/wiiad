import { Integer } from "@/src/common/domain/Integer";
import { UniqId } from "@/src/utils/UniqId";
import { AdTimer } from "./AdTimer";

export type WatchAdTimeoutProps = {
  userId: UniqId;
  campaignId: UniqId;
  timer?: AdTimer;
  onTimeout: () => void;
};

export class WatchAdTimeout {
  readonly userId;
  readonly campaignId;
  private onTimeout: () => void;
  private timer: AdTimer;
  private hasEnded = false;
  private timeoutId?: NodeJS.Timeout;
  private timeout = () =>
    setTimeout(() => {
      this.hasEnded = true;
      this.onTimeout();
    }, this.timer.milliseconds);

  constructor(props: WatchAdTimeoutProps) {
    const { userId, campaignId, timer = new AdTimer(15), onTimeout } = props;
    this.campaignId = campaignId;
    this.userId = userId;
    this.onTimeout = onTimeout;
    this.timer = timer;
  }

  startTimer(): void {
    if (!this.timeoutId) {
      this.timeoutId = this.timeout();
    }
  }

  isEnded = (): boolean => this.hasEnded;

  clearTimeOut(): void {
    clearTimeout(this.timeoutId);
  }
}
