import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { UserProfileSection } from "./UserProfileSection";
import { useReferral } from "@/components/hooks/user/referral/useReferral";
import { useState } from "react";
import { UserSettingsDialog } from "@/components/ui/dialogs-and-options/user-settings/UserSettingsDialog";

interface Props {
  user: IUserPrimitives;
}

export function UserProfile({ user }: Props) {
  const { campaignsWatched, totalBalance, totalReferrers } = useReferral();
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <div className="h-full flex items-center justify-center">
        <UserProfileSection
          onEditButton={() => setShowDialog(true)}
          campaignsWatched={campaignsWatched}
          totalBalance={totalBalance}
          totalReferrers={totalReferrers}
          user={user}
        />

        {showDialog && (
          <UserSettingsDialog  user={user} closeDialog={() => setShowDialog(false)} />
        )}
      </div>
    </>
  );
}
