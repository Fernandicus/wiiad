import { IApiCalls } from "@/components/src/modules/sing-in/domain/interfaces/ISignInApiCalls";
import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";

interface ISignInParams {
  email: Email;
  userName: Name;
}

export class SignUp {
  constructor(private apiCall: IApiCalls) {}

  async user(params: ISignInParams): Promise<void> {
    const { email, userName } = params;
    await this.apiCall.signUpUser({
      email: email.email,
      userName: userName.name,
    });
  }

  async advertiser(params: ISignInParams): Promise<void> {
    const { email, userName } = params;
    await this.apiCall.signUpAdvertiser({
      email: email.email,
      userName: userName.name,
    });
  }
}
