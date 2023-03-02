import { CustomerId } from "../../domain/value-objects/CustomerId";
import { SetupIntent } from "../SetupIntent";

export interface ISetupIntentPrimitives {
  id: string;
  client_secret: string;
}

export class SetupIntentHandler {
  constructor(private setupIntent: SetupIntent) {}

  async create(customerId: string): Promise<ISetupIntentPrimitives> {
    const id = new CustomerId(customerId);
    const setupIntent = await this.setupIntent.create(id);
    return {
      id: setupIntent.id.id,
      client_secret: setupIntent.client_secret.secret,
    };
  }
}
