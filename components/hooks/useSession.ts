import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { IUseSession } from "./interfaces/UserTypes";
import { useUserState } from "./useUserState";

interface IParams {
  onStoreProfileData(): Promise<void>;
}

export const useSession = ({ onStoreProfileData }: IParams): IUseSession => {
  const { changeStatus, session, status, storeSession } = useUserState();

  const initStore = async (session: IUserPrimitives): Promise<void> => {
    try {
      storeSession(session);
      await onStoreProfileData();
      changeStatus("init");
    } catch (err) {
      console.error(err);
    }
  };

  return {
    session,
    status,
    initStore,
  };
};
