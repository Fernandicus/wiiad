import { ParsedUrlQuery } from "querystring";
import { ErrorLogIn } from "./ErrorLogIn";

export class LogInQueryParams {
  readonly email: string;
  readonly token: string;
  readonly userName: string;

  constructor(query: ParsedUrlQuery, params?: ParsedUrlQuery) {
    if (!query["email"]) throw new ErrorLogIn("Missing query param 'email'");
    if (!query["token"]) throw new ErrorLogIn("Missing query param 'token'");

    if (query["email"] instanceof Array) {
      this.email = query["email"][0];
    } else {
      this.email = query["email"];
    }

    if (query["token"] instanceof Array) {
      this.token = query["token"][0];
    } else {
      this.token = query["token"];
    }

    if (!params || !params["userName"])
      throw new ErrorLogIn("Missing param /<userName> to login");
    if (params["userName"] instanceof Array) {
      this.userName = params["userName"][0];
    } else {
      this.userName = params["userName"];
    }
  }
}
