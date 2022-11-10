import { IAuthTokenRepo } from "../domain/IAuthTokenRepo";

export class CreateAuthToken {
  constructor(private authToken: IAuthTokenRepo) {}

  generate(): string {
    return this.authToken.generate();
  }
}
