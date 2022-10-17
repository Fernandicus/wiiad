import {
  createAdvertiserHandler,
  findAdvertiserHandler,
} from "../modules/advertiser/advertiser-container";
import { AdvertiserPropsPrimitives } from "../modules/advertiser/domain/Advertiser";
import { IReqAndRes } from "../domain/IAuthCookies";
import { IUser } from "../domain/IUser";
import { RolType } from "../domain/Rol";
import {
  removeVerificationEmailHandler,
  validateEmailHandler,
} from "../modules/mailing/send-email-verification/email-verification-container";
import { userSession } from "../use-case/container";
import { UniqId } from "../utils/UniqId";

interface AdvertiserData {
  queries: LogInQueries;
  rol: string;
}

interface LogInQueries {
  email: string;
  token: string;
  userName: string;
}

export interface IAdvertiserLogIn {
  advertiser: AdvertiserPropsPrimitives;
  jwt: string;
}

export class LogInController {
  static async initSession(loginQueries: LogInQueries, context: IReqAndRes): Promise<IUser | null> {
    const verificationEmail = await validateEmailHandler.validate(
      loginQueries.token,
      loginQueries.email
    );

    if (verificationEmail.rol !== RolType.USER) {
      const advertiser = await this.advertiserLogIn({
        queries: loginQueries,
        rol: verificationEmail.rol,
      });
      userSession.setFromServer(context, advertiser);
      return advertiser;
    } else {
      //TODO: USER LOG IN
      return null;
    }
  }

  private static async advertiserLogIn(data: AdvertiserData): Promise<IUser> {
    const advertiser = await this.findOrCreateNewAdvertiser(data);
    return advertiser;
  }

  private static async findOrCreateNewAdvertiser(
    data: AdvertiserData
  ): Promise<AdvertiserPropsPrimitives> {
    let advertiserId: string;

    const advertiserFound = await findAdvertiserHandler.findById(
      data.queries.email
    );

    if (!advertiserFound) {
      advertiserId = UniqId.generate();
      await createAdvertiserHandler.create({
        email: data.queries.email,
        name: data.queries.userName,
        id: advertiserId,
        rol: data.rol,
      });
    } else {
      advertiserId = advertiserFound.id;
    }

    await removeVerificationEmailHandler.remove(data.queries.token);

    return {
      id: advertiserId,
      email: data.queries.email,
      name: data.queries.userName,
      rol: data.rol,
    };
  }
}
