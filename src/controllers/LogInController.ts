import {
  createAdvertiserHandler,
  findAdvertiserHandler,
} from "../modules/advertiser/advertiser-container";
import { AdvertiserPropsPrimitives } from "../modules/advertiser/domain/Advertiser";
import { IReqAndRes } from "../domain/IAuthCookies";
import { IGenericUserPrimitives } from "../domain/IGenericUser";
import { RoleType } from "../domain/Role";
import {
  removeVerificationEmailHandler,
  validateEmailHandler,
} from "../modules/mailing/send-email-verification/email-verification-container";
import { userSession } from "../use-case/container";
import { UniqId } from "../utils/UniqId";
import { createUserHandler, findUserHandler } from "../modules/user/container";
import { IUserPrimitives } from "../modules/user/domain/User";
import { ProfilePic } from "../domain/ProfilePic";

interface UserData {
  queries: LogInQueries;
  role: string;
}

interface LogInQueries {
  email: string;
  token: string;
  userName: string;
}

export class LogInController {
  static async initSession(
    loginQueries: LogInQueries,
    context: IReqAndRes
  ): Promise<IGenericUserPrimitives> {
    const verificationEmail = await validateEmailHandler.validate(
      loginQueries.token,
      loginQueries.email
    );

    if (verificationEmail.role !== RoleType.USER) {
      const advertiser = await this.advertiserLogIn({
        queries: loginQueries,
        role: verificationEmail.role,
      });

      this.userInitSession(context, advertiser);
      return advertiser;
    } else {
      const user = await this.userLogIn({
        queries: loginQueries,
        role: verificationEmail.role,
      });

      this.userInitSession(context, user);

      return user;
    }
  }

  private static async advertiserLogIn(
    data: UserData
  ): Promise<AdvertiserPropsPrimitives> {
    const advertiser = await this.findOrCreateNewAdvertiser(data);
    return advertiser;
  }

  private static async findOrCreateNewAdvertiser(
    data: UserData
  ): Promise<AdvertiserPropsPrimitives> {
    const advertiserFound = await findAdvertiserHandler.findByEmail(
      data.queries.email
    );

    if (!advertiserFound) return this.newAdvertiser(data);

    const advertiserId = advertiserFound.id;
    await removeVerificationEmailHandler.remove(data.queries.token);
    return this.user(data, advertiserId, advertiserFound.profilePic);
  }

  private static async userLogIn(data: UserData): Promise<IUserPrimitives> {
    const user = await this.findOrCreateNewUser(data);
    return user;
  }

  private static async findOrCreateNewUser(
    data: UserData
  ): Promise<AdvertiserPropsPrimitives> {
    const userFound = await findUserHandler.findByEmail(data.queries.email);

    if (!userFound) return this.newUser(data);

    const userId = userFound.id;
    await removeVerificationEmailHandler.remove(data.queries.token);
    return this.user(data, userId, userFound.profilePic);
  }

  private static userInitSession(
    context: IReqAndRes,
    payload: IGenericUserPrimitives
  ): void {
    if (userSession.getFromServer(context)) {
      userSession.remove(context);
    }
    userSession.setFromServer(context, payload);
  }

  private static async newAdvertiser(
    data: UserData
  ): Promise<AdvertiserPropsPrimitives> {
    const advertiserId = UniqId.generate();
    const profilePic = ProfilePic.defaultAdvertiserPic;

    await createAdvertiserHandler.create({
      email: data.queries.email,
      name: data.queries.userName,
      id: advertiserId,
      role: data.role,
      profilePic,
    });

    return this.user(data, advertiserId, profilePic);
  }

  private static async newUser(
    data: UserData
  ): Promise<AdvertiserPropsPrimitives> {
    const userId = UniqId.generate();
    const profilePic = ProfilePic.defaultUserPic;

    await createUserHandler.create({
      email: data.queries.email,
      name: data.queries.userName,
      id: userId,
      role: data.role,
      profilePic,
    });

    return this.user(data, userId, profilePic);
  }

  private static user(
    data: UserData,
    id: string,
    profilePic: string
  ): IGenericUserPrimitives {
    return {
      id,
      email: data.queries.email,
      name: data.queries.userName,
      role: data.role,
      profilePic,
    };
  }
}
