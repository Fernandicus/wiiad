import { VerificationEmailModel } from "@/src/mailing/send-email-verification/infrastructure/VerificationEmailModel";
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

  async saveMany():Promise<void>{
    
  }
}
