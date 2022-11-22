import { ParsedUrlQuery } from "querystring";
import { LogStates } from "./LogStates";

export interface ILogingInParams {
  authToken: string;
  userName: string;
}

export class LoginQueries {
  readonly authToken: string;
  readonly log: string;
  readonly userName: string;

  constructor(query: ParsedUrlQuery) {
    const userName = query["userName"];
    const authToken = query["authToken"];
    const log = query["log"];

    this.userName = this.getQuery(userName)!;
    this.authToken = this.getQuery(authToken);
    this.log = this.getQuery(log);
  }

  private getQuery(query: string | string[] | undefined): string {
    if (query instanceof Array) return query[0] ?? "";
    else return query ?? "";
  }

  isLogin(): boolean {
    return this.log === LogStates.LogIn;
  }

  isSignUp(): boolean {
    return this.log === LogStates.SignUp;
  }

  
}
