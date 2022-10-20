import { v4 as uuidv4 } from 'uuid';

export class UniqId {
  readonly id;
  
  constructor(){
    this.id = uuidv4();
  }
  static generate(): string {
    return uuidv4();
  }
}
