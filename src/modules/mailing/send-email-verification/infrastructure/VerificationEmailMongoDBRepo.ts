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
      _id: model.id.id,
      ...model.toPrimitives(),
    } as IVerificationEmailModel);
  }

  async findById(id: UniqId): Promise<VerificationEmailTimer | null> {
    const model = await VerificationEmailModel.findById(id.id);
    if (!model) return null;
    return new VerificationEmailTimer({
      id: new UniqId(model._id),
      email: new Email(model.email),
      expirationDate: new ExpirationDate(model.expirationDate),
      role: new Role(model.role),
    });
  }

  async remove(id: UniqId): Promise<void> {
    await VerificationEmailModel.findByIdAndDelete(id.id);
  }
}
