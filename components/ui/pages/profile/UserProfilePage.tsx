import { IProfilePageParams } from "@/pages/profile";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { useRef } from "react";
import { Logout } from "../../login/Logout";
import {
  Notifications,
  RefNotifications,
} from "../../notifications/Notifications";
import { UserProfileSection } from "./UserProfileSection";


export const UserProfilePage = (params: IProfilePageParams) => {
  const notificationHandler = useRef<RefNotifications>({
    showNotification: () => {},
  });

  return (
    <div>
      <Notifications ref={notificationHandler} />
      <Logout />
      <main className="h-screen bg-slate-100 p-10 w-full ">
        <UserProfileSection userData={params.user} />
      </main>
    </div>
  );
};
