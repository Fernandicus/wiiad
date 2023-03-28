import { Integer } from "@/src/common/domain/Integer";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { UniqId } from "@/src/common/domain/UniqId";
import { AdTimer } from "../../../ad/domain/value-objects/AdTimer";

export type WatchAdTimeoutProps = {
  refereeId: RefereeId;
  referrerId: ReferrerId;
  campaignId: UniqId;
  timer?: AdTimer;
  onTimeout: () => void;
};

export class WatchAdTimeout {
  readonly refereeId;
  readonly referrerId;
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
    const { refereeId, referrerId, campaignId, timer = new AdTimer(15), onTimeout } = props;
    this.campaignId = campaignId;
    this.refereeId = refereeId;
    this.referrerId = referrerId;
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
