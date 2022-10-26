import { MongoDB } from "@/src/infrastructure/MongoDB";
import {
  IVerificationEmailTimerPrimitives,
  VerificationEmailTimer,
} from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import {
  VerificationEmailModel,
  VerificationEmailModelProps,
} from "@/src/modules/mailing/send-email-verification/infrastructure/VerificationEmailModel";
import { VerificationEmailMongoDBRepo } from "@/src/modules/mailing/send-email-verification/infrastructure/VerificationEmailMongoDBRepo";
import mongoose from "mongoose";
import { TestMongoDB } from "../../../../../__mocks__/lib/infrastructure/TestMongoDB";
import { TestVerificationEmailRepo } from "../domain/TestVerificationEmailRepo";

export class TestVerificationEmailMongoDBRepo
  extends TestMongoDB
  implements TestVerificationEmailRepo
{
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
    await TestMongoDB.connectMongoDB();
    const models = verificationEmailProps.map(
      (model): VerificationEmailModelProps => {
        return {
          _id: model.id,
          email: model.email,
          expirationDate: model.expirationDate,
          rol: model.rol,
        };
      }
    );
    await VerificationEmailModel.insertMany(models);
  }

  async findById(
    id: string
  ): Promise<IVerificationEmailTimerPrimitives | null> {
    await TestMongoDB.connectMongoDB();
    const emailFound =
      await VerificationEmailModel.findById<VerificationEmailModelProps>({
        _id: id,
      });
    if (!emailFound) return null;
    return {
      id: emailFound._id,
      email: emailFound.email,
      expirationDate: emailFound.expirationDate,
      rol: emailFound.rol,
    };
  }

  async getAll(): Promise<IVerificationEmailTimerPrimitives[] | null> {
    await TestMongoDB.connectMongoDB();
    const emailsFound =
      await VerificationEmailModel.find<VerificationEmailModelProps>();
    if (emailsFound.length == 0) return null;
    const emails = emailsFound.map(
      (mailFound): IVerificationEmailTimerPrimitives => {
        return {
          id: mailFound._id,
          email: mailFound.email,
          expirationDate: mailFound.expirationDate,
          rol: mailFound.rol,
        };
      }
    );
    return emails;
  }
}
