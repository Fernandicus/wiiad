import { Email } from "@/src/domain/Email";
import { Role } from "@/src/domain/Role";
import { UniqId } from "@/src/utils/UniqId";
import { ExpirationDate } from "../domain/ExpirationDate";
import { IVerificationEmailRepo } from "../domain/IVerificationEmailRepo";
import { VerificationEmailTimer } from "../domain/VerificationEmailTimer";
import {
  IVerificationEmailModel,
  VerificationEmailModel,
} from "./VerificationEmailModel";

export class VerificationEmailMongoDBRepo implements IVerificationEmailRepo {

  async save(model: VerificationEmailTimer): Promise<void> {
    await VerificationEmailModel.create({
      ...model.toPrimitives(),
      _id: model.id.id,
    } as IVerificationEmailModel);
  }

  async findByAuthToken(
    authToken: string
  ): Promise<VerificationEmailTimer | null> {
    const model = await VerificationEmailModel.findOne<IVerificationEmailModel>(
      { authToken } as IVerificationEmailModel
    );
    if (!model) return null;
    return new VerificationEmailTimer({
      id: new UniqId(model._id),
      expirationDate: new ExpirationDate(model.expirationDate),
      email: new Email(model.email),
      role: new Role(model.role),
      authToken: model.authToken,
    });
  }

  async removeById(id: string): Promise<void> {
    await VerificationEmailModel.findByIdAndDelete(id);
  }
}
