import { Auth } from "@/src/infrastructure/Auth";
import { JsonWebTokenNPM } from "@/src/mailing/send-email-verification/infrastructure/JsonWebTokenNPM";
import { UserSession } from "@/src/use-case/UserSession";

describe("On Auth, GIVEN...", ()=>{
    it("WHEN.., THEN..",()=>{
        const auth = new Auth();
        const jwtRepo = new JsonWebTokenNPM();
        const userSession = new UserSession(auth, jwtRepo);
        //userSession.setFromServer()
        expect(1).toBe(2)
    })
})