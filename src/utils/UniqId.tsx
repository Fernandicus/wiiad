import { v4 as uuidv4 } from 'uuid';

export class UniqId {
  static generate(): string {
    return uuidv4();
  }
}
