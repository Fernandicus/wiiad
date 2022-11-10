import { AuthToken } from "./AuthToken";

export interface IAuthTokenRepo{
    generate():AuthToken;
}