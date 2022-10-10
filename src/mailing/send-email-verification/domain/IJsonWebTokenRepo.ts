export interface IJsonWebTokenRepo {
  decode<T extends object>(token: string): T;
  create<T extends object>(payload: T): string;
}
