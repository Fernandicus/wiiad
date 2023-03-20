import { Integer } from "@/src/common/domain/Integer";
import { UniqId } from "@/src/utils/UniqId";
import { AdTimer } from "./AdTimer";

type TWatchAdTimeout = {
  userId: UniqId;
  timer?: AdTimer;
  onTimeout: () => void;
};

export class WatchAdTimeout {
  private timeout: NodeJS.Timeout;
  readonly userId;

  constructor(props: TWatchAdTimeout) {
    const { onTimeout, userId, timer = new AdTimer(3) } = props;
    this.userId = userId;
    this.timeout = setTimeout(onTimeout, timer.milliseconds);
  }

  clearTimeOut() {
    clearTimeout(this.timeout);
  }
}
