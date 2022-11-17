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

    const findReferrer = findReferralHandler.byUserId(referrerId);
    const findReferee = findReferralHandler.byUserId(refereeId);

    const referralsResp = await Promise.allSettled([findReferrer, findReferee]);

    const referrer = referralsResp[0];
    const referee = referralsResp[1];

    if (referrer.status === "rejected") {
      await createReferralHandler.forReferrer({
        id: UniqId.generate(),
        referrerId,
        referrerBalance: balance,
      });
    } else {
      await updateReferralHandler.increaseReferrerBalance(referrerId, balance);
    }

    if (referee.status === "rejected") {
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
