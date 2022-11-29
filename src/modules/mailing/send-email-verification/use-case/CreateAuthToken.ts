import { AuthToken } from "../domain/value-objects/AuthToken";
import { IAuthTokenRepo } from "../domain/interfaces/IAuthTokenRepo";

export class CreateAuthToken {
  constructor(private authToken: IAuthTokenRepo) {}

  generate(): AuthToken {
    return this.authToken.generate();
  }
}
