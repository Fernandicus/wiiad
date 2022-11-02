import { IReferralRepo } from "../domain/IReferralRepo";
import { Referral } from "../domain/Referral";

export class CreateReferral {
  constructor(private referralRepo: IReferralRepo) {}

  async create(referral: Referral): Promise<void> {
    const referralPrimitives = referral.toPrimitives();
    await this.referralRepo.save(referralPrimitives);
  }
}
