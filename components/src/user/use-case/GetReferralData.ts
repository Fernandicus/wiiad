import { Referral } from "@/src/modules/referrals/domain/Referral";
import { IUserApiCalls } from "../domain/interfaces/IUserApiCalls";

export class GetReferralData {
  constructor(private repo: IUserApiCalls) {}

  async get(): Promise<Referral> {
    return await this.repo.getReferralData();
  }
}
