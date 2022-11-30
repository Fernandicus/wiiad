import { Balance } from "@/src/common/domain/Balance";
import { Referral } from "@/src/modules/referrals/domain/Referral";
import { ReferralCounter } from "@/src/modules/referrals/domain/ReferralCounter";
import {
  IReferralModel,
  ReferralModel,
} from "@/src/modules/referrals/infrastructure/db/ReferralModel";
import { UniqId } from "@/src/utils/UniqId";
import mongoose from "mongoose";
import { TestMongoDB } from "../../../../lib/infrastructure/TestMongoDB";
import { TestReferralRepo } from "../domain/TestReferralRepo";

export class TestReferralMongoDBRepo
  extends TestMongoDB
  implements TestReferralRepo
{
  static async init(): Promise<TestReferralMongoDBRepo> {
    await this.connectAndCleanModel(
      mongoose.model(ReferralModel.modelName, ReferralModel.schema)
    );
    return new TestReferralMongoDBRepo();
  }

  async saveMany(referrals: Referral[]): Promise<void> {
    const referralModels = referrals.map((referral): IReferralModel => {
      return {
        ...referral.toPrimitives(),
        _id: referral.id.id,
      };
    });
    await ReferralModel.insertMany<IReferralModel>(referralModels);
  }

  async getAll(): Promise<Referral[] | null> {
    const referrals = await ReferralModel.find<IReferralModel>({});
    if (referrals.length == 0) return null;
    return referrals.map((referral) => {
      return new Referral({
        id: new UniqId(referral._id),
        userId: new UniqId(referral.userId),
        referees: new ReferralCounter(referral.referees),
        referrers: new ReferralCounter(referral.referrers),
        refereeBalance: new Balance(referral.refereeBalance),
        referrerBalance: new Balance(referral.referrerBalance),
      });
    });
  }
}
