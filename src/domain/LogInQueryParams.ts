import { ParsedUrlQuery } from "querystring";
import { ErrorLogIn } from "./ErrorLogIn";

export class LogInQueryParams {
  readonly email: string;
  readonly token: string;
  readonly userName: string;

  constructor(query: ParsedUrlQuery, params: ParsedUrlQuery) {
    if (!query["email"]) throw new ErrorLogIn("Missing query param 'email'");
    if (!query["verificationToken"]) throw new ErrorLogIn("Missing query param 'verificationToken'");
    if (!params || !params["userName"])
      throw new ErrorLogIn("Missing param /<userName> to login");

    if (query["email"] instanceof Array) {
      this.email = query["email"][0];
    } else {
      this.email = query["email"];
    }

    if (query["verificationToken"] instanceof Array) {
      this.token = query["verificationToken"][0];
    } else {
      this.token = query["verificationToken"];
    }

    if (params["userName"] instanceof Array) {
      this.userName = params["userName"][0];
    } else {
      this.userName = params["userName"];
    }
  }
}
