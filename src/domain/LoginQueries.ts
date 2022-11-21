import { ParsedUrlQuery } from "querystring";
import { ErrorLogIn } from "./ErrorLogIn";

export class LoginQueries {
  readonly authToken: string | undefined;
  readonly log: string | undefined;
  readonly userName: string;

  constructor(query: ParsedUrlQuery) {
    const userName = query["userName"];
    const authToken = query["authToken"];
    const log = query["log"];

    if (!userName) throw new ErrorLogIn("Missing param /<userName> to login");
    else this.userName = this.getQuery(userName)!;

    this.authToken = this.getQuery(authToken);
    this.log = this.getQuery(log);
  }

  private getQuery(query: string | string[] | undefined): string | undefined {
    if (query instanceof Array) return query[0];
    else return query;
  }
}
