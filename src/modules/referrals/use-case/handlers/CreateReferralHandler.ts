import { Balance } from "@/src/common/domain/Balance";
import { UniqId } from "@/src/common/domain/UniqId";
import { IReferralPrimitives, Referral } from "../../domain/Referral";
import { ReferralCounter } from "../../domain/ReferralCounter";
import { CreateReferral } from "../CreateReferral";

export class CreateReferralHandler {
  constructor(private createReferral: CreateReferral) {}

  /*   private async create(referral: IReferralPrimitives): Promise<void> {
    const newReferral = new Referral({
      id: new UniqId(referral.id),
      userId: new UniqId(referral.userId),
      refereeBalance: new Balance(referral.refereeBalance),
      referrerBalance: new Balance(referral.referrerBalance),
      referees: new ReferralCounter(referral.referees),
      referrers: new ReferralCounter(referral.referrers),
    });
    await this.createReferral.new(newReferral);
  } */

  async new(props: { userId: string; id: string }) {
    const referral = Referral.empty({
      id: new UniqId(props.id),
      userId: new UniqId(props.userId),
    });
    await this.createReferral.new(referral);
  }

  /*   async forReferee(params: {
    id: string;
    refereeId: string;
    refereeBalance: number;
  }): Promise<void> {
    const uniqId = new UniqId(params.id);
    const userId = new UniqId(params.refereeId);
    const refereeBalance = new Balance(params.refereeBalance);
    const referees = ReferralCounter.one();

    const referrerBalance = Balance.zero();
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

    const refereeBalance = Balance.zero();
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
  } */
}
