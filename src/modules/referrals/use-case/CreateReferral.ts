import { IReferralRepo } from "../domain/interfaces/IReferralRepo";
import { Referral } from "../domain/Referral";

export class CreateReferral {
  constructor(private referralRepo: IReferralRepo) {}

  async create(referral: Referral): Promise<void> {
    await this.referralRepo.save(referral);
  }
}
