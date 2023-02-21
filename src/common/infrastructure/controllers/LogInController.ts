import { IReqAndRes } from "../../../modules/session/domain/interfaces/IAuthCookies";
import { Role, RoleType } from "../../domain/Role";
import { userSession } from "../../../modules/session/infrastructure/session-container";
import { UniqId } from "../../../utils/UniqId";
import { ProfilePic } from "../../domain/ProfilePic";
import { ReferralController } from "../../../modules/referrals/infrastructure/controllers/ReferralController";
import { IUserPrimitives, User } from "@/src/modules/users/user/domain/User";
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
import { HandleUserRoles } from "@/src/modules/users/user/use-case/HandleUserRoles";
import { isAdvertiser, isUser } from "@/src/utils/helpers";
import { HandleRoles } from "@/src/modules/users/user/use-case/HandleRoles";
import { HandleRolesHandler } from "@/src/modules/users/user/handler/HandleRolesHandler";
import { ErrorUpdatingProfile } from "../../domain/errors/ErrorUpdatingProfile";
import { ErrorSingingIn } from "../../domain/errors/ErrorSingingIn";

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
  private readonly handleRole;

  private constructor({ jwtData, context }: ILogingInParams) {
    this.jwtData = jwtData;
    this.context = context;
    this.handleRole = new HandleRolesHandler(this.jwtData.role);
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
    const userData = await this.handleRole.forRole({
      BUSINESS: async () => {
        const advertiser = await this.advertiserLogIn(this.jwtData);
        this.userInitSession(this.context, advertiser);
        return advertiser;
      },
      USER: async () => {
        const user = await this.userLogIn(this.jwtData);
        this.userInitSession(this.context, user);
        return user;
      },
      AGENCY: () => {
        throw new ErrorSingingIn(
          `User ${this.handleRole.role.role} role not exist`
        );
      },
    });

    return {
      user: userData,
    };
  }

  async signUp(): Promise<IProfilePageParams> {
    const userData = await this.handleRole.forRole({
      BUSINESS: async () => {
        const advertiser = await this.getAndCreateNewAdvertiser(this.jwtData);
        this.userInitSession(this.context, advertiser);
        return advertiser;
      },
      USER: async () => {
        const user = await this.getAndCreateNewUser(this.jwtData);

        const referralController = new ReferralController();
        await referralController.createNew(user.id);

        this.userInitSession(this.context, user);
        return user;
      },
      AGENCY: () => {
        throw new ErrorSingingIn(
          `User ${this.handleRole.role.role} role not exist`
        );
      },
    });

    return {
      user: userData,
    };
  }

  async updateEmail(): Promise<IProfilePageParams> {
    const data = this.jwtData;

    await updateUserHandler.email({
      id: data.id!,
      newEmail: data.email,
    });

    const userData = await this.handleRole.forRole({
      BUSINESS: async () => {
        const advertiserFound = await this.findAdvertiserById(data.id!);
        userSession.setFromServer(this.context, advertiserFound);
        return advertiserFound;
      },
      USER: async () => {
        const userFound = await this.findUserById(data.id!);
        userSession.setFromServer(this.context, userFound);
        return userFound;
      },
      AGENCY: () => {
        throw new ErrorUpdatingProfile(
          `User ${this.handleRole.role.role} role not exist`
        );
      },
    });
    return { user: userData };
  }

  private async findAdvertiserById(id: string) {
    const advertiserFound = await findAdvertiserHandler.byId(id);
    return advertiserFound.match({
      nothing() {
        throw ErrorFindingUser.byId(id);
      },
      some: (advertiser) => advertiser,
    });
  }

  private async findUserById(id: string) {
    const userFound = await findUserHandler.byId(id);
    return userFound.match({
      nothing() {
        throw ErrorFindingUser.byId(id);
      },
      some: (user) => user,
    });
  }

  private async advertiserLogIn(
    data: IVerificationEmailData
  ): Promise<IUserPrimitives> {
    const advertiserFound = await findAdvertiserHandler.byEmail(data.email);
    return advertiserFound.match({
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
      nothing() {
        throw ErrorFindingUser.byEmail(data.email);
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
