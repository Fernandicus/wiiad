import { Email } from "@/src/common/domain/Email";
import { Role } from "@/src/common/domain/Role";
import { UniqId } from "@/src/utils/UniqId";
import { AuthToken } from "../domain/value-objects/AuthToken";
import { ExpirationDate } from "../domain/value-objects/ExpirationDate";
import { IVerificationEmailRepo } from "../domain/interfaces/IVerificationEmailRepo";
import { VerificationEmail } from "../domain/VerificationEmail";
import {
  IVerificationEmailModel,
  VerificationEmailModel,
} from "./VerificationEmailModel";

export class VerificationEmailMongoDBRepo implements IVerificationEmailRepo {

  async save(verificationEmail: VerificationEmail): Promise<void> {
    await VerificationEmailModel.create({
      ...verificationEmail.toPrimitives(),
      _id: verificationEmail.id.id,
    } as IVerificationEmailModel);
  }

  async findByAuthToken(
    authToken: AuthToken
  ): Promise<VerificationEmail | null> {
    const model = await VerificationEmailModel.findOne<IVerificationEmailModel>(
      { authToken: authToken.token } as IVerificationEmailModel
    );
    if (!model) return null;
    return new VerificationEmail({
      id: new UniqId(model._id),
      expirationDate: new ExpirationDate(model.expirationDate),
      email: new Email(model.email),
      role: new Role(model.role),
      authToken: new AuthToken(model.authToken) ,
    });
  }

  async removeById(id: UniqId): Promise<void> {
    await VerificationEmailModel.findByIdAndDelete(id.id);
  }
}
