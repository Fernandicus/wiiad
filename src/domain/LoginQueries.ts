import { ParsedUrlQuery } from "querystring";
import { ErrorLogIn } from "./ErrorLogIn";



export class LoginQueries {
  //readonly email: string | undefined;
  readonly authToken: string | undefined;
  readonly userName: string;

  constructor(query: ParsedUrlQuery) {
    const userName = query["userName"];
    //const email = query["email"] ;
    const authToken = query["authToken"];
    
    if (!userName)
      throw new ErrorLogIn("Missing param /<userName> to login");

    /* if (email instanceof Array) {
      this.email = email[0];
    } else {
      this.email = email;
    } */

    if (authToken instanceof Array) {
      this.authToken = authToken[0];
    } else {
      this.authToken = authToken;
    }

    if (userName instanceof Array) {
      this.userName = userName[0];
    } else {
      this.userName = userName;
    }
  }
}
