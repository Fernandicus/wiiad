import { useReducer } from "react";
import { DialogVisibility } from "../../DialogAnimatedContentItem";

export type SectionNames = "settings" | "profile" | "interests";

type ActionSettingsState = { type: SectionNames };

interface NavSettingsState {
  sectionTitle: string;
  sectionName:SectionNames;
  pervSectionName:SectionNames;
  visible: DialogVisibility;
}

const reducer = (state: NavSettingsState, action: ActionSettingsState):NavSettingsState => {
  switch (action.type) {
    case "settings":
      return {
        ...state,
        sectionName: "settings",
        pervSectionName:state.sectionName,
        sectionTitle: "Ajustes",
        visible: "primary",
      };
    case "profile":
      return {
        ...state,
        sectionName: "profile",
        pervSectionName:state.sectionName,
        sectionTitle: "Datos de perfil",
        visible: "secondary",
      };
    case "interests":
      return {
        ...state,
        sectionName: "interests",
        pervSectionName:state.sectionName,
        sectionTitle: "Tus intereses",
        visible: "secondary",
      };
    default:
      return {
        ...state,
        sectionTitle: "Tus intereses",
        pervSectionName:state.sectionName,
        visible: "secondary",
      };
  }
};

export const userNavSettings = () => {

  const initState: NavSettingsState = {
    sectionTitle: "Ajustes",
    sectionName: "settings",
    pervSectionName: "settings",
    visible: "default",
  };

  const [state, dispatch] = useReducer(reducer, initState);

  return {
    state,
    dispatch,
  };
};
