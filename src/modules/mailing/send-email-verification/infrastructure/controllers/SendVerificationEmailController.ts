import { Maybe } from "@/src/common/domain/Maybe";
import { JsonWebTokenNPM } from "@/src/common/infrastructure/JsonWebTokenNPM";
import {
  findAdvertiserHandler,
  findUserHandler,
} from "@/src/modules/users/user/container";
import { ErrorFindingUser } from "@/src/modules/users/user/domain/ErrorFindingUser";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { ErrorSendVerificationEmail } from "../../domain/errors/ErrorSendVerificationEmail";
import { IVerificationEmailData } from "../../domain/interfaces/IVerificationEmailData";
import {
  createAuthTokenHandler,
  sendVerificationEmailHandler,
} from "../email-verification-container";

export class SendVerificationEmailController {
  async sendToNewUser(data: IVerificationEmailData): Promise<void> {
    debugger;
    await this.checkIsNewUser(data);
    await sendVerificationEmailHandler.sendSignUp({
      sendTo: data.email,
      payload: data,
    });
  }

  async sendToUser(data: IVerificationEmailData): Promise<void> {
    const userFound = await findUserHandler.byEmail(data.email);
    await userFound.match({
      nothing() {
        throw ErrorSendVerificationEmail.emailNotExists(data.email);
      },
      some: async (user) => {
        const payload = { ...data, userName: user.name };
        await sendVerificationEmailHandler.sendLogin({
          sendTo: data.email,
          payload,
        });
      },
    });
  }

  async sendToNewAdvertiser(data: IVerificationEmailData): Promise<void> {
    await this.checkIsNewAdvertiser(data);
    await sendVerificationEmailHandler.sendSignUp({
      sendTo: data.email,
      payload: data,
    });
  }

  async sendToAdvertiser(data: IVerificationEmailData): Promise<void> {
    const advertiserFound = await findAdvertiserHandler.byEmail(data.email);
    advertiserFound.match({
      nothing() {
        throw ErrorSendVerificationEmail.emailNotExists(data.email);
      },
      some: async (advertiser) => {
        const { name } = advertiser;
        const payload = { ...data, userName: name };
        await sendVerificationEmailHandler.sendLogin({
          sendTo: data.email,
          payload,
        });
      },
    });
  }

  private async checkIsNewUser(data: IVerificationEmailData): Promise<void> {
    const findUserByName = findUserHandler.byName(data.userName!);
    const findUserByEmail = findUserHandler.byEmail(data.email);

    const [userByName, userByEmail] = await Promise.allSettled([
      findUserByName,
      findUserByEmail,
    ]);

    this.handlePromise({
      promiseResolved: userByName,
      error: ErrorSendVerificationEmail.userNameAlreadyExists(data.userName!),
    });
    
    this.handlePromise({
      promiseResolved: userByEmail,
      error: ErrorSendVerificationEmail.userEmailAlreadyExists(data.email),
    });
  }

  private handlePromise(props: {
    promiseResolved: PromiseSettledResult<Maybe<IUserPrimitives>>;
    error: Error;
  }) {
    const { error, promiseResolved } = props;

    if (promiseResolved.status == "fulfilled") {
      promiseResolved.value.match({
        nothing() {},
        some(_) {
          throw error;
        },
      });
    }
  }

  private async checkIsNewAdvertiser(
    data: IVerificationEmailData
  ): Promise<void> {
    const advertiserFound = findAdvertiserHandler.byName(data.userName!);
    const advertiserFoundByEmail = findAdvertiserHandler.byEmail(data.email);

    const [advertiser, email] = await Promise.allSettled([
      advertiserFound,
      advertiserFoundByEmail,
    ]);

    if (advertiser.status === "fulfilled") this.match(advertiser.value);
    if (email.status === "fulfilled") this.match(email.value);
  }

  private match(value: Maybe<IUserPrimitives>) {
    value.match({
      nothing: () => {},
      some: (value) => {
        throw ErrorSendVerificationEmail.userOrEmailAlreadyExists(
          value.name,
          value.email
        );
      },
    });
  }
}
