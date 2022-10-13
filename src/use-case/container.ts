import { Auth } from "../infrastructure/Auth";
import { JsonWebTokenNPM } from "../infrastructure/JsonWebTokenNPM";
import { UserSession } from "./UserSession";

const auth = new Auth();
const jwtRepo = new JsonWebTokenNPM();
export const userSession = new UserSession(auth, jwtRepo);
