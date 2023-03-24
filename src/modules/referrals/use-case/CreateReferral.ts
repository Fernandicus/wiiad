import { UniqId } from "@/src/utils/UniqId";
import { IReferralRepo } from "../domain/interfaces/IReferralRepo";
import { Referral } from "../domain/Referral";

export class CreateReferral {
  constructor(private referralRepo: IReferralRepo) {}

  async new(props: { id: UniqId; userId: UniqId }): Promise<void> {
    const { id, userId } = props;
    const referral = Referral.empty({
      id,
      userId,
    });
    await this.create(referral);
  }

  private async create(referral: Referral): Promise<void> {
    await this.referralRepo.save(referral);
  }
}
