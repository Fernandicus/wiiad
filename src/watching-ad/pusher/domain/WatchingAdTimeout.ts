import { Integer } from "@/src/common/domain/Integer";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { UniqId } from "@/src/common/domain/UniqId";
import { AdDuration } from "../../../modules/ad/domain/value-objects/AdDuration";

export type TWatchingAdTimeoutPrimitives = {
  id: string;
  refereeId: string;
  referrerId: string;
  campaignId: string;
  isStarted: boolean;
  duration: number;
};

export type WatchingAdTimeoutProps = {
  id: UniqId;
  refereeId: RefereeId;
  referrerId: ReferrerId;
  campaignId: UniqId;
  isStarted: boolean;
  isEnded: boolean;
  duration: AdDuration;
};

export type TNewWatchingAdTimeout = Omit<
  WatchingAdTimeoutProps,
  "id" | "isStarted" | "isEnded"
>;

export class WatchingAdTimeout {
  readonly refereeId;
  readonly referrerId;
  readonly campaignId;
  readonly duration;
  readonly id;

  private isEnded = false;
  private isStarted = false;

  constructor(props: WatchingAdTimeoutProps) {
    const { duration = new AdDuration(15) } = props;
    this.campaignId = props.campaignId;
    this.refereeId = props.refereeId;
    this.referrerId = props.referrerId;
    this.duration = duration;
    this.isStarted = props.isStarted;
    this.isEnded = props.isEnded;
    this.id = props.id;
  }

  static new(props: TNewWatchingAdTimeout): WatchingAdTimeout {
    return new WatchingAdTimeout({
      ...props,
      id: UniqId.new(),
      isStarted: false,
      isEnded: false,
    });
  }

  hasEnded(): boolean {
    return this.isEnded;
  }

  hasStarted(): boolean {
    return this.isStarted;
  }

  toPrimitives(): TWatchingAdTimeoutPrimitives {
    return {
      id: this.id.id,
      campaignId: this.campaignId.id,
      isStarted: this.isStarted,
      refereeId: this.refereeId.uniqId.id,
      referrerId: this.referrerId.uniqId.id,
      duration: this.duration.value,
    };
  }
}
