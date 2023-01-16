import { IApiCalls } from "@/components/src/common/domain/interfaces/IApiCalls";
import { Email } from "@/src/common/domain/Email";
import { ISignInUsers } from "../domain/interfaces/ISignInUsers";

export class LogIn {
  constructor(private apiCall: IApiCalls) {}

  async user(email: Email): Promise<void> {
    await this.apiCall.logInUser(email);
  }

  async advertiser(email: Email): Promise<void> {
    await this.apiCall.logInAdvertiser(email);
  }
}
