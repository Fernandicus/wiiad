import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { UserProfileSection } from "./UserProfileSection";
import { useReferral } from "@/components/hooks/user/referral/useReferral";
import { SectionHeader } from "../../items/SectionHeader";
import { SegmentsCheckBoxList } from "../../ads/ad-form-items/SegmentsCheckBoxList";
import { PrimaryButton } from "@/components/ui/buttons/PrimaryButton";
import { InputTextField } from "@/components/ui/forms/items/InputTextField";
import { EditProfilePic } from "@/components/ui/items/EditProfileItem";
import { CloseIcon } from "@/components/ui/icons/CloseIcon";
import { DialogItem } from "@/components/ui/dialogs-and-options/DialogItem";
import { useState } from "react";
import { SectionNavDialog } from "@/components/ui/dialogs-and-options/SectionNavDialog";
import { BackIcon } from "@/components/ui/icons/BackIcon";
import { BannerIcon } from "@/components/ui/icons/BannerIcon";
import { CreditCard } from "@/components/ui/payment/CreditCard";
import { CreditCardIcon } from "@/components/ui/icons/CreditCardIcon";
import { BoxIcon } from "@/components/ui/icons/BoxIcon";
import { UserIcon } from "@/components/ui/icons/UserIcon";
import { UserSettingsDialog } from "@/components/ui/dialogs-and-options/user-settings/UserSettingsDialog";

interface Props {
  user: IUserPrimitives;
}

export function UserProfile({ user }: Props) {
  const { campaignsWatched, totalBalance, totalReferrers } = useReferral();
  const [showDialog, setShowDialog] = useState(true);

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
