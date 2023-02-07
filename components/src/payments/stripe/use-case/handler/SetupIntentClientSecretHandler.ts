import { SetupIntentClientSecret } from "../SetupIntentClientSecret";

export class SetupIntentClientSecretHandler {
  constructor(private setupIntent: SetupIntentClientSecret) {}

  async get(): Promise<string> {
    const data = await this.setupIntent.get();
    return data.secret;
  }
}
