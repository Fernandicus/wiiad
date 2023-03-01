import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { ReactElement } from "react";
import { DialogAnimatedNav } from "../DialogAnimatedNav";
import { EditInterestsSectionDialog } from "./EditInterestsSectionDialog";
import { EditUserProfileSectionDialog } from "./EditUserProfileSectionDialog";
import { useEditUserProfile } from "./hooks/useEditUserProfile";
import { SectionNames } from "./hooks/useUserSettingsDialogReducer";
import { UserDialogSettingsContent } from "./UserDialogSettingsContent";

type RecordKeys = Exclude<SectionNames, "settings">;

interface UserSettingsProps {
  closeDialog(): void;
  user: IUserPrimitives;
}

export const UserSettingsDialog = ({
  closeDialog,
  user,
}: UserSettingsProps) => {
  const { reducer, fileUploader, updateProfile, valuesHaveChanged, resetValues } =
    useEditUserProfile(user);
  const { state, dispatch } = reducer;

  const section: Record<RecordKeys, ReactElement> = {
    profile: (
      <EditUserProfileSectionDialog
        useFileUploader={fileUploader}
        useUpdateProfile={updateProfile}
        user={user}
      />
    ),
    interests: <EditInterestsSectionDialog />,
  };

  const actionButton = state.visit != "secondary" ? "close" : "save";
  const hasBackButton = state.visit != "secondary" ? false : true;

  const secondarySection =
    state.visit == "main"
      ? section[state.pervSectionName as RecordKeys]
      : section[state.sectionName as RecordKeys];

  return (
    <DialogAnimatedNav
      onSubmit={(e) => {
        e.preventDefault();
        updateProfile.handle.submit(e, { file: fileUploader.filePreview });
      }}
      loadingActionBtn={false}
      disabledActionBtn={!valuesHaveChanged()}
      actionButton={actionButton}
      visit={state.visit}
      secondarySection={secondarySection}
      title={`${state.sectionTitle}`}
      closeDialog={closeDialog}
      onBack={() => {
        dispatch({ type: "settings" });
        resetValues()
      }}
      hasBackButton={hasBackButton}
    >
      <UserDialogSettingsContent
        onClickProfile={() => dispatch({ type: "profile" })}
        onClickInterests={() => dispatch({ type: "interests" })}
      />
    </DialogAnimatedNav>
  );
};
