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
  private timeout: NodeJS.Timeout;
  private hasEnded = false;

  constructor(props: WatchAdTimeoutProps) {
    const { userId, campaignId, timer = new AdTimer(15), onTimeout } = props;
    this.campaignId = campaignId;
    this.userId = userId;
    this.timeout = setTimeout(() => {
      this.hasEnded = true;
      onTimeout();
    }, timer.milliseconds);
  }

  isEnded = () => this.hasEnded;

  clearTimeOut() {
    clearTimeout(this.timeout);
  }
}
