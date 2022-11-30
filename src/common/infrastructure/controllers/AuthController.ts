import { IReqAndRes } from "../../../modules/session/domain/interfaces/IAuthCookies";
import { RoleType } from "../../domain/Role";
import {
  removeVerificationEmailHandler,
  validateEmailHandler,
} from "../../../modules/mailing/send-email-verification/infrastructure/email-verification-container";
import { userSession } from "../../../modules/session/infrastructure/session-container";
import { UniqId } from "../../../utils/UniqId";
import { ProfilePic } from "../../domain/ProfilePic";
import { IVerificationEmailPrimitives } from "../../../modules/mailing/send-email-verification/domain/VerificationEmail";
import { ReferralController } from "../../../modules/referrals/infrastructure/controllers/ReferralController";
import { ILogingInParams, LoginQueries } from "../../domain/LoginQueries";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import {
  createUserHandler,
  findUserHandler,
} from "@/src/modules/users/user/container";

interface UserData {
  queries: ILogingInParams;
  verificationEmail: IVerificationEmailPrimitives;
}

export class AuthController {
  static async logIn(
    loginQueries: ILogingInParams,
    context: IReqAndRes
  ): Promise<IUserPrimitives> {
    const verificationEmail = await validateEmailHandler.validate(
      loginQueries.authToken
    );

    if (verificationEmail.role !== RoleType.USER) {
      const advertiser = await this.advertiserLogIn({
        queries: loginQueries,
        verificationEmail,
      });

      this.userInitSession(context, advertiser);
      return advertiser;
    } else {
      const user = await this.userLogIn({
        queries: loginQueries,
        verificationEmail,
      });

      this.userInitSession(context, user);

      return user;
    }
  }

  static async signUp(
    loginQueries: ILogingInParams,
    context: IReqAndRes
  ): Promise<IUserPrimitives> {
    if (!loginQueries.authToken || !loginQueries.userName)
      throw new Error("No 'auth token or/and userName' queries provided");

    const verificationEmail = await validateEmailHandler.validate(
      loginQueries.authToken
    );

    if (verificationEmail.role !== RoleType.USER) {
      console.log("business");
      const advertiser = await this.advertiserSignUp({
        queries: loginQueries,
        verificationEmail,
      });

      this.userInitSession(context, advertiser);
      return advertiser;
    } else {
      console.log("user");
      const user = await this.userSignUp({
        queries: loginQueries,
        verificationEmail,
      });

      await ReferralController.createNew(user.id);

      this.userInitSession(context, user);

      return user;
    }
  }

  private static async advertiserLogIn(
    data: UserData
  ): Promise<IUserPrimitives> {
    const advertiserFound = await findUserHandler.byEmail(
      data.verificationEmail.email
    );
    const advertiserId = advertiserFound.id;
    await removeVerificationEmailHandler.removeById(data.verificationEmail.id);
    return this.user(data, advertiserId, advertiserFound.profilePic);
  }

  private static async advertiserSignUp(
    data: UserData
  ): Promise<IUserPrimitives> {
    return this.getAndCreateNewAdvertiser(data);
  }

  private static async userLogIn(data: UserData): Promise<IUserPrimitives> {
    const findUser = findUserHandler.byEmail(data.verificationEmail.email);
    const response = await Promise.all([findUser]);
    const userFound = response[0];
    const userId = userFound.id;
    await removeVerificationEmailHandler.removeById(data.verificationEmail.id);
    return this.user(data, userId, userFound.profilePic);
  }

  private static async userSignUp(data: UserData): Promise<IUserPrimitives> {
    await removeVerificationEmailHandler.removeById(data.verificationEmail.id);
    return this.getAndCreateNewUser(data);
  }

  private static userInitSession(
    context: IReqAndRes,
    payload: IUserPrimitives
  ): void {
    if (userSession.getFromServer(context)) {
      userSession.remove(context);
    }
    userSession.setFromServer(context, payload);
  }

  private static async getAndCreateNewAdvertiser(
    data: UserData
  ): Promise<IUserPrimitives> {
    const advertiserId = UniqId.generate();
    const profilePic = ProfilePic.defaultAdvertiserPic;

    await createUserHandler.create({
      email: data.verificationEmail.email,
      name: data.queries.userName,
      id: advertiserId,
      role: data.verificationEmail.role,
      profilePic,
    });

    return this.user(data, advertiserId, profilePic);
  }

  private static async getAndCreateNewUser(
    data: UserData
  ): Promise<IUserPrimitives> {
    const userId = UniqId.generate();
    const profilePic = ProfilePic.defaultUserPic;
    await createUserHandler.create({
      email: data.verificationEmail.email,
      name: data.queries.userName,
      id: userId,
      role: data.verificationEmail.role,
      profilePic,
    });

    return this.user(data, userId, profilePic);
  }

  private static user(
    data: UserData,
    id: string,
    profilePic: string
  ): IUserPrimitives {
    return {
      id,
      email: data.verificationEmail.email,
      name: data.queries.userName,
      role: data.verificationEmail.role,
      profilePic,
    };
  }
}
