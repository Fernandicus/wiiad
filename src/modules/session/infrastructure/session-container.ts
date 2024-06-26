import { AuthCookie } from "./AuthCookie";
import { JsonWebTokenNPM } from "../../../common/infrastructure/JsonWebTokenNPM";
import { UserSession } from "../use-case/UserSession";

const authCookie = new AuthCookie();
const jwtRepo = new JsonWebTokenNPM();
export const userSession = new UserSession(authCookie, jwtRepo);
