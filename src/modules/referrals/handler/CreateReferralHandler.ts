import { Balance } from "@/src/domain/Balance";
import { UniqId } from "@/src/utils/UniqId";
import { IReferralPrimitives, Referral } from "../domain/Referral";
import { ReferralCounter } from "../domain/ReferralCounter";
import { CreateReferral } from "../use-case/CreateReferral";

export class CreateReferralHandler {
  constructor(private createReferral: CreateReferral) {}

  async createEmpty(params: { id: string; userId: string }): Promise<void> {
    const uniqId = new UniqId(params.id);
    const uniqUserId = new UniqId(params.userId);
    const newReferral = Referral.empty({
      id: uniqId,
      userId: uniqUserId,
    });
    await this.createReferral.create(newReferral);
  }

  async forReferee(params: {
    id: string;
    refereeId: string;
    refereeBalance: number;
  }): Promise<void> {
    const uniqId = new UniqId(params.id);
    const userId = new UniqId(params.refereeId);
    const refereeBalance = new Balance(params.refereeBalance);
    const referees = ReferralCounter.one();

    const referrerBalance = Balance.empty();
    const referrers = ReferralCounter.zero();

    const newReferral = new Referral({
      id: uniqId,
      userId,
      referees,
      referrers,
      refereeBalance,
      referrerBalance,
    });

    await this.createReferral.create(newReferral);
  }

  async forReferrer(params: {
    id: string;
    referrerId: string;
    referrerBalance: number;
  }): Promise<void> {
    const uniqId = new UniqId(params.id);
    const userId = new UniqId(params.referrerId);
    const referrerBalance = new Balance(params.referrerBalance);
    const referrers = ReferralCounter.one();

    const refereeBalance = Balance.empty();
    const referees = ReferralCounter.zero();

    const newReferral = new Referral({
      id: uniqId,
      userId,
      referees,
      referrers,
      refereeBalance,
      referrerBalance,
    });

    await this.createReferral.create(newReferral);
  }
}
