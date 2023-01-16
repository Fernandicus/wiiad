import { Email } from "@/src/common/domain/Email";

export interface IApiCalls {
  signUpUser(params: { email: string; userName: string }): Promise<void>;
  signUpAdvertiser(params: { email: string; userName: string }): Promise<void>;
  logInUser(email: Email): Promise<void>;
  logInAdvertiser(email: Email): Promise<void>;
}
