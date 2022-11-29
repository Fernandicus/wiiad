import { findAdvertiserHandler } from "@/src/modules/advertiser/advertiser-container";
import { findUserHandler } from "@/src/modules/user/container";
import { ErrorSendVerificationEmail } from "../domain/errors/ErrorSendVerificationEmail";
import { ISendVerificationEmailRepo } from "../domain/interfaces/ISendVerificationEmailRepo";
import {
  authTokenCreator,
  sendEmailHandler,
  verificationEmailHandler,
} from "../infrastructure/email-verification-container";

export class SendVerificationEmailController {
  static async sendToNewUser(
    data: ISendVerificationEmailRepo,
    id: string
  ): Promise<void> {
    const findUserByName = findUserHandler.findByUserName(data.userName);
    const findUserByEmail = findUserHandler.findByEmail(data.email);

    const resp = await Promise.allSettled([findUserByName, findUserByEmail]);

    if (resp[0].status == "fulfilled" || resp[1].status == "fulfilled")
      throw ErrorSendVerificationEmail.userOrEmailAlreadyExists(
        data.userName,
        data.email
      );

    const authToken = authTokenCreator.generate();
    await this.saveAndSignUpSendEmail({
      email: data.email,
      verificationEmailId: id,
      name: data.userName,
      role: data.role,
      authToken: authToken.token,
    });
  }

  static async sendToUser(
    data: ISendVerificationEmailRepo,
    id: string
  ): Promise<void> {
    try {
      const userFound = await findUserHandler.findByEmail(data.email);
      const authToken = authTokenCreator.generate();
      await this.saveAndSendLogInEmail({
        verificationEmailId: id,
        email: userFound.email,
        name: userFound.name,
        role: userFound.role,
        authToken: authToken.token,
      });
    } catch (error) {
      throw ErrorSendVerificationEmail.emailNotExists(data.email);
    }
  }

  static async sendToNewAdvertiser(
    data: ISendVerificationEmailRepo,
    id: string
  ): Promise<void> {
    const advertiserFound = await findAdvertiserHandler.findByUserName(
      data.userName
    );
    if (advertiserFound)
      throw ErrorSendVerificationEmail.userNameAlreadyExists(data.userName);
    const advertiserFoundByEmail = await findAdvertiserHandler.findByEmail(
      data.email
    );
    if (advertiserFoundByEmail)
      throw ErrorSendVerificationEmail.emailAlreadyExists(data.email);
    const authToken = authTokenCreator.generate();
    await this.saveAndSignUpSendEmail({
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
      throw ErrorSendVerificationEmail.emailNotExists(data.email);
    const authToken = authTokenCreator.generate();
    await this.saveAndSendLogInEmail({
      email: advertiserFoundByEmail.email,
      verificationEmailId: id,
      name: advertiserFoundByEmail.name,
      role: advertiserFoundByEmail.role,
      authToken: authToken.token,
    });
  }

  private static async saveAndSendLogInEmail(params: {
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

  private static async saveAndSignUpSendEmail(params: {
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

    await sendEmailHandler.sendSignUp({
      authToken,
      email,
      userName: name,
    });
  }
}
