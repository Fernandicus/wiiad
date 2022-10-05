import { ErrorEmailVerification } from "./ErrorEmailVerification";

export class VerificationTokenId {
  readonly id;

  constructor(tokenId: string) {
    if (tokenId == "")
      throw new ErrorEmailVerification("Token id cant be empty");
    this.id = tokenId;
  }
}
