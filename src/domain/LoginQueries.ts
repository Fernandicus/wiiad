import { ParsedUrlQuery } from "querystring";
import { ErrorLogIn } from "./ErrorLogIn";

export class LoginQueries {
  readonly email: string | undefined;
  readonly token: string | undefined;
  readonly userName: string;

  constructor(query: ParsedUrlQuery) {
    if (!query["userName"])
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

    if (query["userName"] instanceof Array) {
      this.userName = query["userName"][0];
    } else {
      this.userName = query["userName"];
    }
  }
}
