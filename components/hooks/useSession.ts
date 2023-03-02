import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { IUseSession } from "./interfaces/UserTypes";
import { useUserState } from "./useUserState";

interface IParams {
  onStoreProfileData(): Promise<void>;
}

export const useSession = ({ onStoreProfileData }: IParams): IUseSession => {
  const { changeStatus, session, status, storeSession } = useUserState();

  const initStore = async (session: IUserPrimitives): Promise<void> => {
    storeSession(session);
    await onStoreProfileData();
    changeStatus("init");
  };

  return {
    session,
    status,
    initStore,
  };
};
