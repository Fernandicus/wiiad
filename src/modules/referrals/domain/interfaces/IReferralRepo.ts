import { Balance } from "@/src/common/domain/Balance";
import { Maybe } from "@/src/common/domain/Maybe";
import { UniqId } from "@/src/common/domain/UniqId";
import { RefereeId } from "../RefereeId";
import { Referral } from "../Referral";
import { ReferralCounter } from "../ReferralCounter";
import { ReferrerId } from "../ReferrerId";

export interface IReferralRepo {
  save(referral: Referral): Promise<void>;
  findByUserID(id: UniqId): Promise<Maybe<Referral>>;
  increaseReferrerData(params: {
    referrerId: ReferrerId;
    balance: Balance;
    counter: ReferralCounter;
  }): Promise<void>;
  increaseRefereeData(params: {
    refereeId: RefereeId;
    balance: Balance;
    counter: ReferralCounter;
  }): Promise<void>;
}
