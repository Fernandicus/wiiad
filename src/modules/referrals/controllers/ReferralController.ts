import { UniqId } from "@/src/utils/UniqId";
import { Referral } from "../domain/Referral";
import {
  createReferralHandler,
  findReferralHandler,
  updateReferralHandler,
} from "../referral-container";

export class ReferralController {
  static async updateBalance(params: {
    referrerId: string;
    refereeId: string;
    balance: number;
  }): Promise<void> {
    const { refereeId, referrerId, balance } = params;
    const increaseReferrer = updateReferralHandler.increaseReferrerBalance(
      referrerId,
      balance
    );
    const increaseReferee = updateReferralHandler.increaseRefereeBalance(
      refereeId,
      balance
    );

    await Promise.all([increaseReferrer, increaseReferee]);
  }

  static async createNew(userId: string): Promise<void> {
    const referral = Referral.empty({
      id: UniqId.new(),
      userId: new UniqId(userId),
    });

    await createReferralHandler.create({
      id: UniqId.generate(),
      userId,
      referral: referral.toPrimitives(),
    });
  }
}
