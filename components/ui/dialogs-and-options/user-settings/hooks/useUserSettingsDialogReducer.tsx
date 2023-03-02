import { assertUnreachable } from "@/src/utils/helpers";
import { Dispatch } from "react";
import { DialogViews } from "../../DialogAnimatedContentItem";
import { NavSettingsState, useNavSettings } from "./useNavSettings";

export type SectionNames = "settings" | "profile" | "interests";

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

const initState: NavSettingsState<SectionNames, DialogViews> = {
  sectionTitle: "Ajustes",
  visit: "default",
  pervSectionName: "settings",
  sectionName: "settings",
};

export const useUserSettingsDialogReducer = (): {
  state: NavSettingsState<SectionNames, DialogViews>;
  dispatch: Dispatch<{
    type: SectionNames;
  }>;
} => {
  const { state, dispatch } = useNavSettings<SectionNames, DialogViews>({
    initState,
    reducer,
  });
  return { state, dispatch };
};
