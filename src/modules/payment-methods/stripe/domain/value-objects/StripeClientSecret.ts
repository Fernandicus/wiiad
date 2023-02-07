
export class StripeClientSecret {
  readonly secret;
  constructor(secret: string) {
    if (!secret) throw new Error("Error creating Stripe Client Secret. can't be empty");
    if (!secret.includes("_secret_"))
      throw new Error("Stripe Client Secret must contain '_secret_'");
    this.secret = secret;
  }
}
