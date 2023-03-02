import { Balance } from "@/src/common/domain/Balance";
import { UniqId } from "@/src/utils/UniqId";
import { ReferralCounter } from "./ReferralCounter";

export interface IReferralPrimitives {
  id: string;
  userId: string;
  referrers: number;
  referees: number;
  referrerBalance: number;
  refereeBalance: number;
}

export interface IReferralProps {
  id: UniqId;
  userId: UniqId;
  referrers: ReferralCounter;
  referees: ReferralCounter;
  referrerBalance: Balance;
  refereeBalance: Balance;
}

/**
 * The `referrer` is the user who refers another user.
 * The `referee` is the user who has been referred by another user (by the referrer)
 *
 * @param referrerBalance The amount of money that has won as a referrer.
 * @param refereeBalance The amount of money that has won as a referee.
 */
export class Referral {
  readonly id;
  readonly userId;
  readonly referrers;
  readonly referees;
  readonly referrerBalance;
  readonly refereeBalance;

  constructor(params: IReferralProps) {
    this.id = params.id;
    this.userId = params.userId;
    this.referrers = params.referrers;
    this.referees = params.referees;
    this.referrerBalance = params.referrerBalance;
    this.refereeBalance = params.refereeBalance;
  }

  static empty(params: { id: UniqId; userId: UniqId }): Referral {
    return new Referral({
      id: params.id,
      userId: params.userId,
      refereeBalance: Balance.zero(),
      referrerBalance: Balance.zero(),
      referees: ReferralCounter.zero(),
      referrers: ReferralCounter.zero(),
    });
  }

  toPrimitives(): IReferralPrimitives {
    return {
      id: this.id.id,
      userId: this.userId.id,
      referees: this.referees.getAmount(),
      referrers: this.referrers.getAmount(),
      refereeBalance: this.refereeBalance.total,
      referrerBalance: this.referrerBalance.total,
    };
  }
}
