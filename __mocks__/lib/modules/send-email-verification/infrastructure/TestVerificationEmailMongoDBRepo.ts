import { Email } from "@/src/domain/Email";
import { Role } from "@/src/domain/Role";
import { ExpirationDate } from "@/src/modules/mailing/send-email-verification/domain/ExpirationDate";
import {
  IVerificationEmailTimerPrimitives,
  VerificationEmailTimer,
} from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import {
  IVerificationEmailModel,
  VerificationEmailModel,
} from "@/src/modules/mailing/send-email-verification/infrastructure/VerificationEmailModel";
import { UniqId } from "@/src/utils/UniqId";
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
    verificationEmailProps: VerificationEmailTimer[]
  ): Promise<void> {
    await TestMongoDB.connectMongoDB();
    const models: IVerificationEmailModel[] = verificationEmailProps.map(
      (model) => {
        return {
          _id: model.id.id,
          ...model.toPrimitives(),
        };
      }
    );
    await VerificationEmailModel.insertMany<IVerificationEmailModel>(models);
  }

  async findById(id: UniqId): Promise<VerificationEmailTimer | null> {
    await TestMongoDB.connectMongoDB();
    const emailFound =
      await VerificationEmailModel.findById<IVerificationEmailModel>({
        _id: id.id,
      } as IVerificationEmailModel);
    if (!emailFound) return null;
    return this.toVerificationEmail(emailFound);
  }

  async getAll(): Promise<VerificationEmailTimer[] | null> {
    await TestMongoDB.connectMongoDB();
    const emailsFound =
      await VerificationEmailModel.find<IVerificationEmailModel>();

    if (emailsFound.length == 0) return null;

    const emails: VerificationEmailTimer[] = emailsFound.map((email) => {
      return this.toVerificationEmail(email);
    });
    return emails;
  }

  private toVerificationEmail(
    model: IVerificationEmailModel
  ): VerificationEmailTimer {
    return new VerificationEmailTimer({
      id: new UniqId(model._id),
      email: new Email(model.email),
      expirationDate: new ExpirationDate(model.expirationDate),
      role: new Role(model.role),
    });
  }
}
