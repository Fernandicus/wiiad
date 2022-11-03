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
    let advertiserId: string;

    const advertiserFound = await findAdvertiserHandler.findByEmail(
      data.queries.email
    );

    if (!advertiserFound) {
      advertiserId = UniqId.generate();
      await createAdvertiserHandler.create({
        email: data.queries.email,
        name: data.queries.userName,
        id: advertiserId,
        role: data.role,
      });
    } else {
      advertiserId = advertiserFound.id;
    }

    await removeVerificationEmailHandler.remove(data.queries.token);

    return {
      id: advertiserId,
      email: data.queries.email,
      name: data.queries.userName,
      role: data.role,
    };
  }

  private static async userLogIn(data: UserData): Promise<IUserPrimitives> {
    const user = await this.findOrCreateNewUser(data);
    return user;
  }

  private static async findOrCreateNewUser(
    data: UserData
  ): Promise<AdvertiserPropsPrimitives> {
    let userId: string;

    const userFound = await findUserHandler.findByEmail(data.queries.email);

    if (!userFound) {
      userId = UniqId.generate();
      await createUserHandler.create({
        email: data.queries.email,
        name: data.queries.userName,
        id: userId,
        role: data.role,
      });
    } else {
      userId = userFound.id;
    }

    await removeVerificationEmailHandler.remove(data.queries.token);

    return {
      id: userId,
      email: data.queries.email,
      name: data.queries.userName,
      role: data.role,
    };
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
}
