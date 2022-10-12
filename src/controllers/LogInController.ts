import {
  createAdvertiserHandler,
  findAdvertiserHandler,
} from "../advertiser/advertiser-container";
import { AdvertiserPropsPrimitives } from "../advertiser/domain/Advertiser";
import { LogInQueryParams } from "../domain/LogInQueryParams";
import { RolType } from "../domain/Rol";
import {
  jwtHandler,
  removeVerificationEmailHandler,
  validateEmailHandler,
} from "../mailing/send-email-verification/email-verification-container";
import { UniqId } from "../utils/UniqId";

interface AdvertiserData {
  queryParams: LogInQueryParams;
  rol: string;
}

export interface IAdvertiserLogIn {
  advertiser: AdvertiserPropsPrimitives;
  jwt: string;
}

export class LogInController {
  static async verify(
    loginQueryParams: LogInQueryParams
  ): Promise<IAdvertiserLogIn | null> {
    const verificationEmail = await validateEmailHandler.validateToken(
      loginQueryParams.token
    );

    if (verificationEmail.rol !== RolType.USER) {
      const { jwt, advertiser } = await this.advertiserLogIn({
        queryParams: loginQueryParams,
        rol: verificationEmail.rol,
      });
      return { advertiser, jwt };
    } else {
      return null;
    }
  }

  private static async advertiserLogIn(
    data: AdvertiserData
  ): Promise<IAdvertiserLogIn> {
    const advertiser = await this.findOrCreateNewAdvertiser(data);
    const jwt = jwtHandler.advertiserToken(advertiser);
    return {
      advertiser,
      jwt,
    };
  }

  private static async findOrCreateNewAdvertiser(
    data: AdvertiserData
  ): Promise<AdvertiserPropsPrimitives> {
    let advertiserId: string;

    const advertiserFound = await findAdvertiserHandler.findById(
      data.queryParams.email
    );

    if (!advertiserFound) {
      advertiserId = UniqId.generate();
      await createAdvertiserHandler.create({
        email: data.queryParams.email,
        name: data.queryParams.userName,
        id: advertiserId,
        rol: data.rol,
      });
    } else {
      advertiserId = advertiserFound.id;
    }

    await removeVerificationEmailHandler.remove(data.queryParams.token);

    return {
      id: advertiserId,
      email: data.queryParams.email,
      name: data.queryParams.userName,
      rol: data.rol,
    };
  }
}
