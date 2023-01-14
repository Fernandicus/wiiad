import { JsonWebTokenNPM } from "@/src/modules/session/infrastructure/JsonWebTokenNPM";
import {
  findAdvertiserHandler,
  findUserHandler,
} from "@/src/modules/users/user/container";
import { ErrorFindingUser } from "@/src/modules/users/user/domain/ErrorFindingUser";
import { ErrorSendVerificationEmail } from "../../domain/errors/ErrorSendVerificationEmail";
import { IVerificationEmailData } from "../../domain/interfaces/IVerificationEmailData";
import { sendEmailHandler } from "../email-verification-container";

export class SendVerificationEmailController {
  constructor(private jwt: JsonWebTokenNPM) {}

  async sendToNewUser(data: IVerificationEmailData): Promise<void> {
    await this.checkIsNewUser(data);
    const authToken = this.jwt.withExpirationDate(data, 900);
    await sendEmailHandler.sendSignUp({
      ...data,
      authToken,
    });
  }

  async sendToUser(data: IVerificationEmailData): Promise<void> {
    try {
      const { name } = await findUserHandler.byEmail(data.email);
      const payload = { ...data, userName: name };
      const authToken = this.jwt.withExpirationDate(payload, 900);

      await sendEmailHandler.sendLogin({
        ...data,
        authToken,
      });
    } catch (error) {
      if (error instanceof ErrorFindingUser)
        throw ErrorSendVerificationEmail.emailNotExists(data.email);
      throw error;
    }
  }

  async sendToNewAdvertiser(data: IVerificationEmailData): Promise<void> {
    const authToken = this.jwt.withExpirationDate(data, 900);
    await this.checkIsNewAdvertiser(data);
    await sendEmailHandler.sendSignUp({
      ...data,
      authToken,
    });
  }

  async sendToAdvertiser(data: IVerificationEmailData): Promise<void> {
    try {
      const { name } = await findAdvertiserHandler.byEmail(data.email);
      const payload = { ...data, userName: name };
      const authToken = this.jwt.withExpirationDate(payload, 900);
      await sendEmailHandler.sendSignUp({
        ...data,
        authToken,
      });
    } catch (err) {
      if (err instanceof ErrorFindingUser)
        throw ErrorSendVerificationEmail.emailNotExists(data.email);
      throw err;
    }
  }

  private async checkIsNewUser(data: IVerificationEmailData): Promise<void> {
    const findUserByName = findUserHandler.byName(data.userName);
    const findUserByEmail = findUserHandler.byEmail(data.email);

    const resp = await Promise.allSettled([findUserByName, findUserByEmail]);

    if (resp[0].status == "fulfilled" || resp[1].status == "fulfilled")
      throw ErrorSendVerificationEmail.userOrEmailAlreadyExists(
        data.userName,
        data.email
      );
  }

  private async checkIsNewAdvertiser(
    data: IVerificationEmailData
  ): Promise<void> {
    const advertiserFound = findAdvertiserHandler.byName(data.userName);
    const advertiserFoundByEmail = findAdvertiserHandler.byEmail(data.email);

    const resp = await Promise.allSettled([
      advertiserFound,
      advertiserFoundByEmail,
    ]);

    if (resp[0].status == "fulfilled" || resp[1].status == "fulfilled")
      throw ErrorSendVerificationEmail.userOrEmailAlreadyExists(
        data.userName,
        data.email
      );
  }
}
