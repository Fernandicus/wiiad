import { findAdvertiserHandler } from "@/src/modules/advertiser/advertiser-container";
import { findUserHandler } from "@/src/modules/user/container";
import { ErrorEmailVerification } from "../domain/ErrorEmailVerification";
import { ISendVerificationEmailRepo } from "../domain/ISendVerificationEmailRepo";
import {
  authTokenCreator,
  sendEmailHandler,
  verificationEmailHandler,
} from "../email-verification-container";

export class SendVerificationEmailController {
  static async sendToNewUser(
    data: ISendVerificationEmailRepo,
    id: string
  ): Promise<void> {
    await this.checkIfUserNameExists(data);
    await this.checkIfUserEmailExists(data);
    const authToken = authTokenCreator.generate();
    await this.saveAndSendEmail({
      email: data.email,
      verificationEmailId: id,
      name: data.userName,
      role: data.role,
      authToken: authToken.token,
    });
  }

  static async checkIfUserNameExists(
    data: ISendVerificationEmailRepo
  ): Promise<void> {
    const userNameFoundByName = await findUserHandler.findByUserName(
      data.userName
    );
    if (userNameFoundByName)
      throw new ErrorEmailVerification(
        `El nombre de ususario '${data.userName}' ya existe`
      );
  }

  static async checkIfUserEmailExists(
    data: ISendVerificationEmailRepo
  ): Promise<void> {
    const userFoundByEmail = await findUserHandler.findByEmail(data.email);
    if (userFoundByEmail)
      throw new ErrorEmailVerification(
        `El email '${data.email}' ya está asignado a un usuario`
      );
  }

  static async sendToUser(
    data: ISendVerificationEmailRepo,
    id: string
  ): Promise<void> {
    const userFoundByEmail = await findUserHandler.findByEmail(data.email);
    if (!userFoundByEmail)
      throw new ErrorEmailVerification(`El email '${data.email}' no existe`);
    const authToken = authTokenCreator.generate();

    await this.saveAndSendEmail({
      email: userFoundByEmail.email,
      verificationEmailId: id,
      name: userFoundByEmail.name,
      role: userFoundByEmail.role,
      authToken: authToken.token,
    });
  }
  

  static async sendToNewAdvertiser(
    data: ISendVerificationEmailRepo,
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
    const authToken = authTokenCreator.generate();
    await this.saveAndSendEmail({
      email: data.email,
      verificationEmailId: id,
      name: data.userName,
      role: data.role,
      authToken: authToken.token,
    });
  }

  static async sendToAdvertiser(
    data: ISendVerificationEmailRepo,
    id: string
  ): Promise<void> {
    const advertiserFoundByEmail = await findAdvertiserHandler.findByEmail(
      data.email
    );
    if (!advertiserFoundByEmail)
      throw new ErrorEmailVerification(`El email '${data.email}' no existe`);
    const authToken = authTokenCreator.generate();
    await this.saveAndSendEmail({
      email: advertiserFoundByEmail.email,
      verificationEmailId: id,
      name: advertiserFoundByEmail.name,
      role: advertiserFoundByEmail.role,
      authToken: authToken.token,
    });
  }

  private static async saveAndSendEmail(params: {
    email: string;
    name: string;
    role: string;
    verificationEmailId: string;
    authToken: string;
  }): Promise<void> {
    const { email, verificationEmailId, name, role, authToken } = params;

    await verificationEmailHandler.saveWithExpirationIn5min({
      email,
      id: verificationEmailId,
      role,
      authToken,
    });

    await sendEmailHandler.sendLogin({
      authToken,
      email,
      userName: name,
    });
  }
}
