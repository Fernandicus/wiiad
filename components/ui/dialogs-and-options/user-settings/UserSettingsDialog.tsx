import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { ReactElement, useReducer, useState } from "react";
import { InputTextField } from "../../forms/items/InputTextField";
import { BoxIcon } from "../../icons/BoxIcon";
import { UserIcon } from "../../icons/UserIcon";
import { EditProfilePic } from "../../items/EditProfileItem";
import { DialogItem } from "../DialogItem";
import { SectionNavDialog } from "../SectionNavDialog";
import { SectionNames, userNavSettings } from "./hooks/useUserNavSettings";
import { UserSettingsDialogContent } from "./UserSettingsDialogContent";

type RecordKeys = Exclude<SectionNames, "settings">;

interface UserSettingsProps {
  closeDialog(): void;
  user: IUserPrimitives;
}

export const UserSettingsDialog = ({
  closeDialog,
  user,
}: UserSettingsProps) => {
  const { state, dispatch } = userNavSettings();

  const settingsSection: Record<RecordKeys, ReactElement> = {
    profile: (
      <div className="p-5">
        <div className="flex justify-center">
          <EditProfilePic profilePic={user.profilePic} size="md" />
        </div>
        <InputTextField label="Nombre" value={user.name} />
        <InputTextField label="Email" value={user.email} />
      </div>
    ),
    interests: (
      <div className="w-full">
        <h1>a</h1>
      </div>
    ),
  };

  return (
    <DialogItem
      title={`${state.sectionTitle}`}
      closeDialog={closeDialog}
      onBack={() => dispatch({ type: "settings" })}
      hasBackButton={
        state.visible == "default" || state.visible == "primary" ? false : true
      }
    >
      <UserSettingsDialogContent
        visible={state.visible}
        onClickProfile={() => dispatch({ type: "profile" })}
        onClickInterests={() => dispatch({ type: "interests" })}
      >
        {state.sectionName == "settings"
          ? settingsSection[state.pervSectionName as RecordKeys]
          : settingsSection[state.sectionName as RecordKeys]}
      </UserSettingsDialogContent>
    </DialogItem>
  );
};
