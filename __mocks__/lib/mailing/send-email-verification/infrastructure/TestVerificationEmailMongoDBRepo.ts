import { MongoDB } from "@/src/infrastructure/MongoDB";
import {
  IVerificationEmailTimerPrimitives,
  VerificationEmailTimer,
} from "@/src/mailing/send-email-verification/domain/VerificationEmailTimer";
import {
  VerificationEmailModel,
  VerificationEmailModelProps,
} from "@/src/mailing/send-email-verification/infrastructure/VerificationEmailModel";
import { VerificationEmailMongoDBRepo } from "@/src/mailing/send-email-verification/infrastructure/VerificationEmailMongoDBRepo";
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

  async findById(
    id: string
  ): Promise<IVerificationEmailTimerPrimitives | null> {
    const mongoDB = await MongoDB.verificationEmailRepo();
    const found = await mongoDB.findById(id);
    return found;
  }
}
