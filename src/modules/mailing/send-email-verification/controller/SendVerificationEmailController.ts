import { findAdvertiserHandler } from "@/src/modules/advertiser/advertiser-container";
import { findUserHandler } from "@/src/modules/user/container";
import { ErrorFindingUser } from "@/src/modules/user/domain/ErrorFindingUser";
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
    const findUserByName = findUserHandler.findByUserName(data.userName);
    const findUserByEmail = findUserHandler.findByEmail(data.email);

    const resp = await Promise.allSettled([findUserByName, findUserByEmail]);

    if (resp[0].status == "fulfilled" || resp[1].status == "fulfilled")
      throw new ErrorEmailVerification(
        `El nombre de ususario '${data.userName}' o el email '${data.email}' ya existen`
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
      throw new ErrorEmailVerification(`El email '${data.email}' no existe`);
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
      throw new ErrorEmailVerification(`El email '${data.email}' no existe`);
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
