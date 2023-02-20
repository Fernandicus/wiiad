import { IReqAndRes } from "../../../modules/session/domain/interfaces/IAuthCookies";
import { RoleType } from "../../domain/Role";
import { userSession } from "../../../modules/session/infrastructure/session-container";
import { UniqId } from "../../../utils/UniqId";
import { ProfilePic } from "../../domain/ProfilePic";
import { ReferralController } from "../../../modules/referrals/infrastructure/controllers/ReferralController";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import {
  createUserHandler,
  findAdvertiserHandler,
  findUserHandler,
  updateUserHandler,
} from "@/src/modules/users/user/container";
import { JsonWebTokenNPM } from "@/src/common/infrastructure/JsonWebTokenNPM";
import { IVerificationEmailData } from "@/src/modules/mailing/send-email-verification/domain/interfaces/IVerificationEmailData";
import { IJsonWebTokenRepo } from "@/src/common/domain/interfaces/IJsonWebTokenRepo";
import { LoginQueries } from "../../domain/LoginQueries";
import { IProfilePageParams } from "@/pages/profile";
import { ErrorFindingUser } from "@/src/modules/users/user/domain/ErrorFindingUser";
import { ProfileDataController } from "./ProfileDataController";

interface ILogingInParams {
  jwtData: IVerificationEmailData;
  context: IReqAndRes;
}

interface IVerifyJWTParams {
  authToken: string;
  context: IReqAndRes;
  jwtManager?: IJsonWebTokenRepo;
}

export class SignInController {
  private readonly context;
  private readonly jwtData;

  private constructor({ jwtData, context }: ILogingInParams) {
    this.jwtData = jwtData;
    this.context = context;
  }

  static verifyJWT({
    authToken,
    context,
    jwtManager = new JsonWebTokenNPM(),
  }: IVerifyJWTParams) {
    if (!authToken) throw new Error("No 'auth token query provided");
    const data = jwtManager.verify(authToken) as IVerificationEmailData;
    return new SignInController({ jwtData: data, context });
  }

  async signIn(loginQueries: LoginQueries): Promise<IProfilePageParams> {
    let data: IProfilePageParams;

    if (loginQueries.isLogin()) {
      data = await this.logIn();
      return {
        user: data.user,
      };
    }

    if (loginQueries.isSignUp()) {
      data = await this.signUp();
      return {
        user: data.user,
      };
    }

    throw new Error(`Something went wrong Singing Up or Logging In.`);
  }

  async logIn(): Promise<IProfilePageParams> {
    if (this.jwtData.role !== RoleType.USER) {
      const advertiser = await this.advertiserLogIn(this.jwtData);
      this.userInitSession(this.context, advertiser);
      return {
        user: advertiser,
      };
    } else {
      const user = await this.userLogIn(this.jwtData);

      this.userInitSession(this.context, user);

      return { user };
    }
  }

  async signUp(): Promise<IProfilePageParams> {
    if (this.jwtData.role !== RoleType.USER) {
      const advertiser = await this.getAndCreateNewAdvertiser(this.jwtData);
      this.userInitSession(this.context, advertiser);
      return {
        user: advertiser,
      };
    } else {
      const user = await this.getAndCreateNewUser(this.jwtData);

      const controller = new ReferralController();
      await controller.createNew(user.id);

      this.userInitSession(this.context, user);

      return { user };
    }
  }

  //TODO: Handle update email
  async updateEmail(): Promise<IProfilePageParams> {
    const data = this.jwtData;

    await updateUserHandler.email({
      id: data.id!,
      email: data.email,
    });
    
    const session = userSession.getFromServer(this.context);

    if (!session) {
      const advertiserFound = await findAdvertiserHandler.byId(data.id!);
      const advertiser = advertiserFound.match({
        nothing() {
          throw ErrorFindingUser.byId(data.id!);
        },
        some: (advertiser) => advertiser,
      });
      userSession.setFromServer(this.context, advertiser);
      return { user: advertiser };
    }

    const sessionUpdated = {
      ...session!,
      email: data.email,
    };

    userSession.setFromServer(this.context, sessionUpdated);
    return {
      user: sessionUpdated,
    };
  }

  private async advertiserLogIn(
    data: IVerificationEmailData
  ): Promise<IUserPrimitives> {
    const advertiserFound = await findAdvertiserHandler.byEmail(data.email);
    return advertiserFound.match({
      nothing() {
        throw ErrorFindingUser.byEmail(data.email);
      },
      some(advertiser) {
        const { id, profilePic } = advertiser;
        return {
          id,
          email: data.email,
          name: data.userName!,
          role: data.role,
          profilePic,
        };
      },
    });
  }

  private async userLogIn(
    data: IVerificationEmailData
  ): Promise<IUserPrimitives> {
    const findUser = findUserHandler.byEmail(data.email);
    const response = await Promise.all([findUser]);
    const userFound = response[0];
    const userId = userFound.id;
    return this.user({ data, id: userId, profilePic: userFound.profilePic });
  }

  private userInitSession(context: IReqAndRes, payload: IUserPrimitives): void {
    if (userSession.getFromServer(context)) {
      userSession.remove(context);
    }
    userSession.setFromServer(context, payload);
  }

  private async getAndCreateNewAdvertiser(
    data: IVerificationEmailData
  ): Promise<IUserPrimitives> {
    const advertiserId = UniqId.generate();
    const profilePic = ProfilePic.defaultAdvertiserPic;

    await createUserHandler.create({
      email: data.email,
      name: data.userName!,
      id: advertiserId,
      role: data.role,
      profilePic,
    });

    return this.user({
      data,
      id: advertiserId,
      profilePic,
    });
  }

  private async getAndCreateNewUser(
    data: IVerificationEmailData
  ): Promise<IUserPrimitives> {
    const userId = UniqId.generate();
    const profilePic = ProfilePic.defaultUserPic;
    await createUserHandler.create({
      email: data.email,
      name: data.userName!,
      id: userId,
      role: data.role,
      profilePic,
    });

    return this.user({
      data,
      id: userId,
      profilePic,
    });
  }

  private user(params: {
    data: IVerificationEmailData;
    id: string;
    profilePic: string;
  }): IUserPrimitives {
    const { data, id, profilePic } = params;
    return {
      id,
      email: data.email,
      name: data.userName!,
      role: data.role,
      profilePic,
    };
  }
}
