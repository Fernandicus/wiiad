export interface IApiResp<T = undefined> {
    message: string;
    data?: T;
  }