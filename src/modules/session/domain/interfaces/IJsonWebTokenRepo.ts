export interface IJsonWebTokenRepo {
  decode<T extends object>(token: string): T;
  create<T extends object>(payload: T): string;
  verify<T extends object>(token: string): T;
  withExpirationDate<T extends object>(payload: T, expiresIn: number): string;
}
