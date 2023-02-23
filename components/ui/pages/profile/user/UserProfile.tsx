import { Logout } from "../../../login/Logout";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { useEffect, useState } from "react";
import { DataCard } from "./items/DataCard";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { UserDataProfile } from "./UserDataProfile";
import { CardItem } from "../../../items/CardItem";
import { EditIcon } from "@/components/ui/icons/EditIcon";
import { CristalCardItem } from "@/components/ui/items/CristalCardItem";
import { UserProfileSection } from "./UserProfileSection";
import { CloseIcon } from "@/components/ui/icons/CloseIcon";
import { InterestItem } from "./items/InterestItem";
import { InterestBox } from "./items/InterestsBox";
import { useReferral } from "@/components/hooks/user/referral/useReferral";

interface Props {
  user: IUserPrimitives;
}

export function UserProfile({ user }: Props) {
  const { campaignsWatched, totalBalance, totalReferrers } = useReferral();

  return (
    <div className="h-full flex items-center justify-center">
      <div>
        <UserProfileSection
          campaignsWatched={campaignsWatched}
          totalBalance={totalBalance}
          totalReferrers={totalReferrers}
          user={user}
        />
      </div>
    </div>
  );
}
