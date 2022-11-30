import { Balance } from "@/src/common/domain/Balance";
import { UniqId } from "@/src/utils/UniqId";
import { Referral } from "../Referral";
import { ReferralCounter } from "../ReferralCounter";

export interface IReferralRepo {
  save(referral: Referral): Promise<void>;
  findByUserID(id: UniqId): Promise<Referral | null>;
  increaseReferrerData(params: {
    userId: UniqId;
    balance: Balance;
    counter: ReferralCounter;
  }): Promise<void>;
  increaseRefereeData(params: {
    userId: UniqId;
    balance: Balance;
    counter: ReferralCounter;
  }): Promise<void>;
}
