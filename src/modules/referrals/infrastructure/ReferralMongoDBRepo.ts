import { HydratedDocument } from "mongoose";
import { IReferralRepo } from "../domain/IReferralRepo";
import { IReferralPrimitives } from "../domain/Referral";
import { IReferralModelProps, ReferralModel } from "./ReferralModel";

export class ReferralMongoDBRepo implements IReferralRepo {
  async save(referral: IReferralPrimitives): Promise<void> {
    const referralModel: HydratedDocument<IReferralModelProps> =
      new ReferralModel<IReferralModelProps>({
        _id: referral.id,
        ...referral,
      });

    await referralModel.save();
  }

  async findByUserID(id: string): Promise<IReferralPrimitives | null> {
    const referralModel = await ReferralModel.findOne<IReferralModelProps>({
      userId: id,
    });
    if (!referralModel) return null;
    return {
      id: referralModel._id,
      userId: referralModel.userId,
      referees: referralModel.referees,
      referrers: referralModel.referrers,
      refereeBalance: referralModel.refereeBalance,
      referrerBalance: referralModel.referrerBalance,
    };
  }

  async increaseReferrerData(params: {
    userId: string;
    balance: number;
    counter: number;
  }): Promise<void> {
    await ReferralModel.updateOne<IReferralModelProps>(
      { userId: params.userId },
      {
        $inc: { referrers: params.counter, referrerBalance: params.balance },
      }
    );
  }

  async increaseRefereeData(params: {
    userId: string;
    balance: number;
    counter: number;
  }): Promise<void> {
    await ReferralModel.updateOne<IReferralModelProps>(
      { userId: params.userId },
      {
        $inc: { referees: params.counter, refereeBalance: params.balance },
      }
    );
  }
}
