import { AuthCookie } from "../infrastructure/AuthCookie";
import { JsonWebTokenNPM } from "../infrastructure/JsonWebTokenNPM";
import { UserSession } from "./UserSession";

const authCookie = new AuthCookie();
const jwtRepo = new JsonWebTokenNPM();
export const userSession = new UserSession(authCookie, jwtRepo);
