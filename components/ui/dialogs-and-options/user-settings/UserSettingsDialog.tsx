import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { assertUnreachable } from "@/src/utils/helpers";
import { ReactElement } from "react";
import { InputTextField } from "../../forms/items/InputTextField";
import { EditProfilePic } from "../../items/EditProfileItem";
import { DialogViews } from "../DialogAnimatedContentItem";
import { DialogAnimatedNav } from "../DialogAnimatedNav";
import { NavSettingsState, useNavSettings } from "./hooks/useNavSettings";
import { UserDialogSettingsContent } from "./UserDialogSettingsContent";

type RecordKeys = Exclude<SectionNames, "settings">;

interface UserSettingsProps {
  closeDialog(): void;
  user: IUserPrimitives;
}

type SectionNames = "settings" | "profile" | "interests";

const reducer = (
  state: NavSettingsState<SectionNames, DialogViews>,
  action: {
    type: SectionNames;
  }
): NavSettingsState<SectionNames, DialogViews> => {
  switch (action.type) {
    case "settings":
      return {
        ...state,
        sectionName: "settings",
        pervSectionName: state.sectionName,
        sectionTitle: "Ajustes",
        visit: "main",
      };
    case "profile":
      return {
        ...state,
        sectionName: "profile",
        pervSectionName: state.sectionName,
        sectionTitle: "Datos de perfil",
        visit: "secondary",
      };
    case "interests":
      return {
        ...state,
        sectionName: "interests",
        pervSectionName: state.sectionName,
        sectionTitle: "Tus intereses",
        visit: "secondary",
      };
    default:
      return assertUnreachable(action.type);
  }
};

const initState = {
  sectionTitle: "Ajustes",
  visit: "default",
  pervSectionName: "settings",
  sectionName: "settings",
} satisfies NavSettingsState<SectionNames, DialogViews>;

export const UserSettingsDialog = ({
  closeDialog,
  user,
}: UserSettingsProps) => {
  const { state, dispatch } = useNavSettings<SectionNames, DialogViews>({
    initState,
    reducer,
  });

  const section: Record<RecordKeys, ReactElement> = {
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

  const settingsSection = (
    <UserDialogSettingsContent
      onClickProfile={() => dispatch({ type: "profile" })}
      onClickInterests={() => dispatch({ type: "interests" })}
    />
  );

  return (
    <DialogAnimatedNav
      hasCloseButton={
        state.visit == "default" || state.visit == "main" ? true : false
      }
      visit={state.visit}
      mainSection={settingsSection}
      secondarySection={
        state.visit == "main"
          ? section[state.pervSectionName as RecordKeys]
          : section[state.sectionName as RecordKeys]
      }
      title={`${state.sectionTitle}`}
      closeDialog={closeDialog}
      onBack={() => dispatch({ type: "settings" })}
      hasBackButton={
        state.visit == "default" || state.visit == "main" ? false : true
      }
    />
  );
};
