import { Balance } from "@/src/domain/Balance";
import {
  Referral,
  IReferralProps,
  IReferralPrimitives,
} from "@/src/modules/referrals/domain/Referral";
import { ReferralCounter } from "@/src/modules/referrals/domain/ReferralCounter";
import { UniqId } from "@/src/utils/UniqId";

export class FakeReferral extends Referral {
  constructor(params: IReferralProps) {
    super(params);
  }

  static create(userId: UniqId): Referral {
    return new Referral({
      id: UniqId.new(),
      userId: userId,
      refereeBalance: new Balance(Math.round(Math.random() * 1000)),
      referrerBalance: new Balance(Math.round(Math.random() * 1000)),
      referees: new ReferralCounter(Math.round(Math.random() * 1000)),
      referrers: new ReferralCounter(Math.round(Math.random() * 1000)),
    });
  }

  static createWithPrimitives(userId: string): IReferralPrimitives {
    return {
      id: UniqId.generate(),
      userId: userId,
      refereeBalance: Math.round(Math.random() * 1000),
      referrerBalance: Math.round(Math.random() * 1000),
      referees: Math.round(Math.random() * 1000),
      referrers: Math.round(Math.random() * 1000),
    };
  }

  static createMany(userIds: UniqId[]): Referral[] {
    let referrals: Referral[] = [];

    for (let i = 0; i < userIds.length; i++) {
      referrals.push(this.create(userIds[i]));
    }

    return referrals;
  }
/* 
  static createManyWithPrimitives(
    userId: string,
    amount = 5
  ): IReferralPrimitives[] {
    const referrals = this.createMany(new UniqId(userId), amount);
    const referralsPrimitives = referrals.map(
      (referral): IReferralPrimitives => {
        return referral.toPrimitives();
      }
    );

    return referralsPrimitives;
  } */
}
