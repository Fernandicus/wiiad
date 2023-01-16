import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { APISendEmailVerification } from "@/pages/api/v1/auth/login";
import {  RoleType } from "@/src/common/domain/Role";
import { IApiCalls } from "../domain/interfaces/IApiCalls";
import { IVerificationEmailData } from "@/src/modules/mailing/send-email-verification/domain/interfaces/IVerificationEmailData";
import { Email } from "@/src/common/domain/Email";

export class FetchApiCall implements IApiCalls {
  constructor() {}

  async logInUser(email: Email): Promise<void> {
    await this.fetchLogInUser({
      role: RoleType.USER,
      email: email.email,
    });
  }

  async logInAdvertiser(email: Email): Promise<void> {
    await this.fetchLogInUser({
      role: RoleType.BUSINESS,
      email: email.email,
    });
  }

  async signUpUser(params: { email: string; userName: string }): Promise<void> {
    await this.fetchSingUpUser({
      role: RoleType.USER,
      ...params,
    });
  }

  async signUpAdvertiser(params: {
    email: string;
    userName: string;
  }): Promise<void> {
    await this.fetchSingUpUser({
      role: RoleType.BUSINESS,
      ...params,
    });
  }

  private async fetchLogInUser(data: IVerificationEmailData): Promise<void> {
    const body: APISendEmailVerification = {
      isNewUser: false,
      data,
    };
    const resp = await this.fetchPost(ApiRoutes.login, body);
    await this.validateCreateUserResponse(resp);
  }

  private async fetchSingUpUser(data: IVerificationEmailData): Promise<void> {
    const body: APISendEmailVerification = {
      isNewUser: true,
      data,
    };
    const resp = await this.fetchPost(ApiRoutes.login, body);
    await this.validateCreateUserResponse(resp);
  }

  private async validateCreateUserResponse(resp: Response): Promise<void> {
    const jsonResp = await resp.json();
    const message =
      jsonResp.message !== "" ? jsonResp.message : `Algo ha ido mal`;
    if (resp.status !== 200)
      throw new Error("Error creating new user", { cause: message });
  }

  private async fetchPost<T extends object>(
    route: string,
    body: T
  ): Promise<Response> {
    return await fetch(route, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
}
