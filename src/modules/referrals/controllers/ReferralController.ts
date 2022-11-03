import { UniqId } from "@/src/utils/UniqId";
import {
  createReferralHandler,
  findReferralHandler,
  updateReferralHandler,
} from "../referral-container";

export class ReferralController {
  static async updateBalanceAndCounters(params: {
    referrerId: string;
    refereeId: string;
    balance: number;
  }) {
    const { refereeId, referrerId, balance } = params;

    const referrer_referralFound = await findReferralHandler.byUserId(
      referrerId
    );

    const referee_referralFound = await findReferralHandler.byUserId(refereeId);

    if (!referrer_referralFound) {
      await createReferralHandler.forReferrer({
        id: UniqId.generate(),
        referrerId,
        referrerBalance: balance,
      });
    } else {
      await updateReferralHandler.increaseReferrerBalance(referrerId, balance);
    }

    if (!referee_referralFound) {
      await createReferralHandler.forReferee({
        id: UniqId.generate(),
        refereeId,
        refereeBalance: balance,
      });
    } else {
      await updateReferralHandler.increaseRefereeBalance(refereeId, balance);
    }
  }
}
