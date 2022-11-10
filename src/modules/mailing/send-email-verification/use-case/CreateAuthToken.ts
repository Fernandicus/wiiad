import { AuthToken } from "../domain/AuthToken";
import { IAuthTokenRepo } from "../domain/IAuthTokenRepo";

export class CreateAuthToken {
  constructor(private authToken: IAuthTokenRepo) {}

  generate(): AuthToken {
    return this.authToken.generate();
  }
}
