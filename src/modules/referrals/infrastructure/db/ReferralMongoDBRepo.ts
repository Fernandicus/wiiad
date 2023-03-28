import { Balance } from "@/src/common/domain/Balance";
import { Maybe } from "@/src/common/domain/Maybe";
import { UniqId } from "@/src/common/domain/UniqId";
import { IReferralRepo } from "../../domain/interfaces/IReferralRepo";
import { RefereeId } from "../../domain/RefereeId";
import { Referral } from "../../domain/Referral";
import { ReferralCounter } from "../../domain/ReferralCounter";
import { ReferrerId } from "../../domain/ReferrerId";
import { IReferralModel, ReferralModel } from "./ReferralModel";

export class ReferralMongoDBRepo implements IReferralRepo {
  async save(referral: Referral): Promise<void> {
    await ReferralModel.create({
      ...referral.toPrimitives(),
      _id: referral.id.id,
    } as IReferralModel);
  }

  async findByUserID(id: UniqId): Promise<Maybe<Referral>> {
    const referralModel = await ReferralModel.findOne<IReferralModel>({
      userId: id.id,
    } as IReferralModel);
    if (!referralModel) return Maybe.nothing();
    return Maybe.some(
      Referral.fromPrimitives({
        id: referralModel._id,
        userId: referralModel.userId,
        referees: referralModel.referees,
        referrers: referralModel.referrers,
        refereeBalance: referralModel.refereeBalance,
        referrerBalance: referralModel.referrerBalance,
      })
    );
  }

  async increaseReferrerData(params: {
    referrerId: ReferrerId;
    balance: Balance;
    counter: ReferralCounter;
  }): Promise<void> {
    await ReferralModel.updateOne<IReferralModel>(
      { userId: params.referrerId.uniqId.id } as IReferralModel,
      {
        $inc: {
          referrers: params.counter.getAmount(),
          referrerBalance: params.balance.total,
        },
      }
    );
  }

  async increaseRefereeData(params: {
    refereeId: RefereeId;
    balance: Balance;
    counter: ReferralCounter;
  }): Promise<void> {
    await ReferralModel.updateOne<IReferralModel>(
      { userId: params.refereeId.uniqId.id } as IReferralModel,
      {
        $inc: {
          referees: params.counter.getAmount(),
          refereeBalance: params.balance.total,
        },
      }
    );
  }
}
