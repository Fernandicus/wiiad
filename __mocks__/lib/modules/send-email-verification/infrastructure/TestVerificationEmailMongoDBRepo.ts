import { Email } from "@/src/domain/Email";
import { Role } from "@/src/domain/Role";
import { AuthToken } from "@/src/modules/mailing/send-email-verification/domain/value-objects/AuthToken";
import { ExpirationDate } from "@/src/modules/mailing/send-email-verification/domain/value-objects/ExpirationDate";
import { VerificationEmail } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmail";
import {
  IVerificationEmailModel,
  VerificationEmailModel,
} from "@/src/modules/mailing/send-email-verification/infrastructure/db/VerificationEmailModel";
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

  async saveMany(verificationEmailProps: VerificationEmail[]): Promise<void> {
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

  async findById(id: UniqId): Promise<VerificationEmail | null> {
    await TestMongoDB.connectMongoDB();
    const emailFound =
      await VerificationEmailModel.findById<IVerificationEmailModel>({
        _id: id.id,
      } as IVerificationEmailModel);
    if (!emailFound) return null;
    return this.toVerificationEmail(emailFound);
  }

  async getAll(): Promise<VerificationEmail[] | null> {
    await TestMongoDB.connectMongoDB();
    const emailsFound =
      await VerificationEmailModel.find<IVerificationEmailModel>();

    if (emailsFound.length == 0) return null;

    const emails: VerificationEmail[] = emailsFound.map((email) => {
      return this.toVerificationEmail(email);
    });
    return emails;
  }

  private toVerificationEmail(
    model: IVerificationEmailModel
  ): VerificationEmail {
    return new VerificationEmail({
      id: new UniqId(model._id),
      email: new Email(model.email),
      expirationDate: new ExpirationDate(model.expirationDate),
      role: new Role(model.role),
      authToken: new AuthToken(model.authToken),
    });
  }
}
