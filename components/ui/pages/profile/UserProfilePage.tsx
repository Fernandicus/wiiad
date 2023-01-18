import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { useRef } from "react";
import { Logout } from "../../login/Logout";
import {
  Notifications,
  RefNotifications,
} from "../../notifications/Notifications";
import { UserProfileSection } from "./UserProfileSection";

export interface IProfilePageParams {
  user: IUserPrimitives;
  ads?: AdPropsPrimitives[]; //| null;
  campaigns?: ICampaignPrimitives[]; //| null;
}

export const UserProfilePage = (params: IProfilePageParams) => {
  const { user, ads, campaigns } = params;
  const notificationHandler = useRef<RefNotifications>({
    showNotification: () => {},
  });

  return (
    <div>
      <Notifications ref={notificationHandler} />
      <Logout />
      <main className="h-screen bg-slate-100 p-10 w-full ">
        <UserProfileSection
          userData={user}
          ads={ads}
          campaigns={campaigns}
        />
      </main>
    </div>
  );
};
