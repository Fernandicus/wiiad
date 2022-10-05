import { ErrorVerificationToken } from "./ErrorVerificationToken";

export class VerificationTokenId {
  readonly id;

  constructor(tokenId: string) {
    if (tokenId == "")
      throw new ErrorVerificationToken("Token id cant be empty");
    this.id = tokenId;
  }
}
