import { IReferralPrimitives } from "@/src/modules/referrals/domain/Referral";
import {
  IReferralModelProps,
  ReferralModel,
} from "@/src/modules/referrals/infrastructure/ReferralModel";
import { IUserPrimitives } from "@/src/modules/user/domain/User";
import mongoose from "mongoose";
import { TestMongoDB } from "../../../../lib/infrastructure/TestMongoDB";
import { TestReferralRepo } from "../domain/TestReferralRepo";

export class TestReferralMongoDBRepo
  extends TestMongoDB
  implements TestReferralRepo
{
  static async init(): Promise<TestReferralRepo> {
    await this.connectAndCleanModel(
      mongoose.model(ReferralModel.modelName, ReferralModel.schema)
    );
    return new TestReferralMongoDBRepo();
  }

  async saveMany(referrals: IReferralPrimitives[]): Promise<void> {
    const referralModels = referrals.map((referral): IReferralModelProps => {
      return {
        ...referral,
        _id: referral.id,
      };
    });
    await ReferralModel.insertMany(referralModels);
  }
  
  async getAll(): Promise<IReferralPrimitives[] | null> {
    const referrals = await ReferralModel.find({});
    if(!referrals) return null;
    return referrals;
  }
}
