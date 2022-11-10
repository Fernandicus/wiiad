export class AuthToken {
  readonly token;
  constructor(token: string) {
    if (!token) throw Error("Auth Token can't be empty");
    this.token = token;
  }
}
