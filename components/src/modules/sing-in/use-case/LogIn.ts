import { IApiCalls } from "@/components/src/modules/sing-in/domain/interfaces/ISignInApiCalls";
import { Email } from "@/src/common/domain/Email";

export class LogIn {
  constructor(private apiCall: IApiCalls) {}

  async user(email: Email): Promise<void> {
    await this.apiCall.logInUser(email);
  }

  async advertiser(email: Email): Promise<void> {
    await this.apiCall.logInAdvertiser(email);
  }
}
