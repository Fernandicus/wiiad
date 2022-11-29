import { AuthToken } from "../value-objects/AuthToken";

export interface IAuthTokenRepo{
    generate():AuthToken;
}