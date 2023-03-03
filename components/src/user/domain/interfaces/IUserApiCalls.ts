import { IReferralPrimitives, Referral } from "@/src/modules/referrals/domain/Referral";


export interface IUserApiCalls{
    getReferralData(): Promise<Referral>;
}