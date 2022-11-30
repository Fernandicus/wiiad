import { Balance } from "@/src/domain/Balance";
import { UniqId } from "@/src/utils/UniqId";
import { IReferralRepo } from "../domain/interfaces/IReferralRepo";
import { Referral } from "../domain/Referral";
import { ReferralCounter } from "../domain/ReferralCounter";
import { IReferralModel, ReferralModel } from "./ReferralModel";

export class ReferralMongoDBRepo implements IReferralRepo {
  async save(referral: Referral): Promise<void> {
    await ReferralModel.create({
      ...referral.toPrimitives(),
      _id: referral.id.id,
    } as IReferralModel);
  }

  async findByUserID(id: UniqId): Promise<Referral | null> {
    const referralModel = await ReferralModel.findOne<IReferralModel>({
      userId: id.id,
    } as IReferralModel);
    if (!referralModel) return null;
    return new Referral({
      id: new UniqId(referralModel._id),
      userId: new UniqId(referralModel.userId),
      referees: new ReferralCounter(referralModel.referees),
      referrers: new ReferralCounter(referralModel.referrers),
      refereeBalance: new Balance(referralModel.refereeBalance),
      referrerBalance: new Balance(referralModel.referrerBalance),
    });
  }

  async increaseReferrerData(params: {
    userId: UniqId;
    balance: Balance;
    counter: ReferralCounter;
  }): Promise<void> {
    await ReferralModel.updateOne<IReferralModel>(
      { userId: params.userId.id } as IReferralModel,
      {
        $inc: {
          referrers: params.counter.getAmount(),
          referrerBalance: params.balance.total,
        },
      }
    );
  }

  async increaseRefereeData(params: {
    userId: UniqId;
    balance: Balance;
    counter: ReferralCounter;
  }): Promise<void> {
    await ReferralModel.updateOne<IReferralModel>(
      { userId: params.userId.id } as IReferralModel,
      {
        $inc: {
          referees: params.counter.getAmount(),
          refereeBalance: params.balance.total,
        },
      }
    );
  }
}
