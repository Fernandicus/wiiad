import { useReducer } from "react";

export interface NavSettingsState<T, V> {
  sectionTitle: string;
  sectionName: T;
  pervSectionName: T;
  visit: V;
}

export const useNavSettings = <T, V>({
  initState,
  reducer,
}: {
  initState: NavSettingsState<T, V>;
  reducer: (
    state: NavSettingsState<T, V>,
    action: { type: T }
  ) => NavSettingsState<T, V>;
}) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return {
    state,
    dispatch,
  };
};
