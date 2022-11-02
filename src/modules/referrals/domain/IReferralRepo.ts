import { IReferralPrimitives } from "./Referral";

export interface IReferralRepo {
  save(referral: IReferralPrimitives): Promise<void>;
  findByUserID(id:string):Promise<IReferralPrimitives | null>;
  increaseReferrerData(params:{userId:string; balance:number; counter:number}):Promise<void>;
  increaseRefereeData(params:{userId:string; balance:number; counter:number}):Promise<void>;
}
