import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { HandleRolesHandler } from "@/src/modules/users/user/handler/HandleRolesHandler";
import { useEffect } from "react";
import { useAdvertiser } from "./advertiser/useAdvertiser";
import { IUseSession, TSessionStatus } from "./interfaces/UserTypes";
import { useUser } from "./user/useUser";

export const useAccount = (): IUseSession => {
  const advertiser = useAdvertiser();
  const user = useUser();
  const sessionList = [user, advertiser];

  const handleInitStore = async (session: IUserPrimitives) => {
    const roleHandler = new HandleRolesHandler(session.role);
    roleHandler.forRole({
      BUSINESS: () => advertiser.initStore(session),
      USER: () => user.initStore(session),
      AGENCY: () => {
        throw new Error("Agency role is not available");
      },
    });
  };

  const handleSession = !user.session.id ? advertiser.session : user.session;

  const handleStatus = (): TSessionStatus => {
    const session = sessionList.find((session) => session.status == "init");
    if (!session) return "non-init";
    return session.status;
  };

  return {
    session: handleSession,
    status: handleStatus(),
    initStore: handleInitStore,
  };
};
