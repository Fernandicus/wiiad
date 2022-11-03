import { IGenericUserPrimitives } from "@/src/domain/IGenericUser";
import { findAdvertiserHandler } from "@/src/modules/advertiser/advertiser-container";
import { findUserHandler } from "@/src/modules/user/container";
import { UniqId } from "@/src/utils/UniqId";
import { ErrorEmailVerification } from "../domain/ErrorEmailVerification";
import { ISendVerificationEmail } from "../domain/ISendVerificationEmail";
import {
  sendEmailHandler,
  verificationEmailHandler,
} from "../email-verification-container";

export class SendVerificationEmailController {
  static async sendToNewUser(
    data: ISendVerificationEmail,
    id: string
  ): Promise<void> {
    const userNameFoundByName = await findUserHandler.findByUserName(
      data.userName
    );
    if (userNameFoundByName)
      throw new ErrorEmailVerification(
        `El nombre de ususario '${data.userName}' ya existe`
      );
    const userFoundByEmail = await findUserHandler.findByEmail(data.email);
    if (userFoundByEmail)
      throw new ErrorEmailVerification(
        `El email '${data.email}' ya está asignado a un usuario`
      );

    await this.send({
      email: data.email,
      verificationEmailId: id,
      name: data.userName,
      role: data.role,
    });
  }

  static async sendToUser(
    data: ISendVerificationEmail,
    id: string
  ): Promise<void> {
    const userFoundByEmail = await findUserHandler.findByEmail(data.email);
    if (!userFoundByEmail)
      throw new ErrorEmailVerification(`El email '${data.email}' no existe`);

    await verificationEmailHandler.saveWithExpirationIn5min({
      email: userFoundByEmail.email,
      id,
      role: userFoundByEmail.role,
    });

    await this.send({
      email: userFoundByEmail.email,
      verificationEmailId: id,
      name: userFoundByEmail.name,
      role: userFoundByEmail.role,
    });
  }

  static async sendToNewAdvertiser(
    data: ISendVerificationEmail,
    id: string
  ): Promise<void> {
    const advertiserFound = await findAdvertiserHandler.findByUserName(
      data.userName
    );
    if (advertiserFound)
      throw new ErrorEmailVerification(
        `El nombre de anunciante '${data.userName}' ya existe`
      );
    const advertiserFoundByEmail = await findAdvertiserHandler.findByEmail(
      data.email
    );
    if (advertiserFoundByEmail)
      throw new ErrorEmailVerification(
        `El email '${data.email}' ya está asignado a un anunciante`
      );
    await this.send({
      email: data.email,
      verificationEmailId: id,
      name: data.userName,
      role: data.role,
    });
  }

  static async sendToAdvertiser(
    data: ISendVerificationEmail,
    id: string
  ): Promise<void> {
    const advertiserFoundByEmail = await findAdvertiserHandler.findByEmail(
      data.email
    );
    if (!advertiserFoundByEmail)
      throw new ErrorEmailVerification(`El email '${data.email}' no existe`);

    await this.send({
      email: advertiserFoundByEmail.email,
      verificationEmailId: id,
      name: advertiserFoundByEmail.name,
      role: advertiserFoundByEmail.role,
    });
  }

  private static async send(params: {
    email: string;
    name: string;
    role: string;
    verificationEmailId: string;
  }): Promise<void> {
    const { email, verificationEmailId, name, role } = params;
    await verificationEmailHandler.saveWithExpirationIn5min({
      email,
      id: verificationEmailId,
      role,
    });

    await sendEmailHandler.send({
      id: verificationEmailId,
      email,
      userName: name,
    });
  }
}
