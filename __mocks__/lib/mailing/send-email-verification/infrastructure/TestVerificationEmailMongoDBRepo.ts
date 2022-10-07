import { IVerificationEmailTimerPrimitives } from "@/src/mailing/send-email-verification/domain/VerificationEmailTimer";
import {
  VerificationEmailModel,
  VerificationEmailModelProps,
} from "@/src/mailing/send-email-verification/infrastructure/VerificationEmailModel";
import mongoose from "mongoose";
import { TestMongoDB } from "../../../../../__mocks__/lib/infrastructure/TestMongoDB";

export class TestVerificationEmailMongoDBRepo extends TestMongoDB {
  static async init(): Promise<TestVerificationEmailMongoDBRepo> {
    await this.connectAndCleanModel(
      mongoose.model(
        VerificationEmailModel.modelName,
        VerificationEmailModel.schema
      )
    );
    return new TestVerificationEmailMongoDBRepo();
  }

  async saveMany(
    verificationEmailProps: IVerificationEmailTimerPrimitives[]
  ): Promise<void> {
    const models = verificationEmailProps.map(
      (model): VerificationEmailModelProps => {
        return {
          _id: model.id,
          ...model,
        };
      }
    );
    await VerificationEmailModel.insertMany(models);
  }
}
