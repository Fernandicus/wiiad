import { RoleType } from "@/src/common/domain/Role";
import {
  logInHandler,
  signUpHandler,
} from "../../../modules/sing-in/infrastructure/sign-in-container";

interface ISingUpParams {
  email: string;
  userName: string;
  role: RoleType;
}

interface ILogInParams {
  email: string;
  role: RoleType;
}

export class SubmitFormController {
  constructor() {}

  async singUp(params: ISingUpParams): Promise<void> {
    const { email, role, userName } = params;
    await this.singInSwitcher({
      role,
      isUser: async () => await signUpHandler.user({ email, userName }),
      isAdvertiser: async () =>
        await signUpHandler.advertiser({ email, userName }),
    });
  }

  async logIn(params: ILogInParams): Promise<void> {
    const { email, role } = params;
    await this.singInSwitcher({
      role,
      isUser: async () => await logInHandler.user(email),
      isAdvertiser: async () => await logInHandler.advertiser(email),
    });
  }

  private async singInSwitcher(params: {
    role: RoleType;
    isUser(): Promise<void>;
    isAdvertiser(): Promise<void>;
  }): Promise<void> {
    const { role, isUser, isAdvertiser } = params;
    switch (role) {
      case RoleType.USER:
        await isUser();
        break;
      case RoleType.BUSINESS:
        await isAdvertiser();
        break;
      default:
        break;
    }
  }
}
