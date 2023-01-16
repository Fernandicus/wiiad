import { IApiCalls } from "@/components/src/common/domain/interfaces/IApiCalls";
import { ISignInUsers } from "../domain/interfaces/ISignInUsers";

export class SignUp {
  constructor(private apiCall: IApiCalls) {}

  async user(params: ISignInUsers): Promise<void> {
    const { email, userName } = params;
    await this.apiCall.signUpUser({
      email: email.email,
      userName: userName.name,
    });
  }

  async advertiser(params: ISignInUsers): Promise<void> {
    const { email, userName } = params;
    await this.apiCall.signUpAdvertiser({
      email: email.email,
      userName: userName.name,
    });
  }
}
