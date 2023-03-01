import { useFileUploader } from "@/components/ui/pages/ads/hooks/useFileUploader";
import { useUpdateProfileDataForm } from "@/components/ui/pages/profile/advertiser/hooks/useUpdateProfileDataForm";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { useEffect } from "react";
import { useUserSettingsDialogReducer } from "./useUserSettingsDialogReducer";

export const useEditUserProfile = (user: IUserPrimitives) => {
  const reducer = useUserSettingsDialogReducer();

  const updateProfile = useUpdateProfileDataForm(user);

  const fileUploader = useFileUploader({
    fileMaxSize: 1024 * 1024,
  });

  const valuesHaveChanged = () => {
    const { email, name } = updateProfile.input.values;
    return (
      email !== user.email ||
      name !== user.name ||
      fileUploader.filePreview !== undefined
    );
  };

  return {
    reducer,
    updateProfile,
    fileUploader,
    valuesHaveChanged,
    resetValues: () => {
      updateProfile.input.values.email = user.email;
      updateProfile.input.values.name = user.name;
      updateProfile.input.values.profilePic = user.profilePic;
      fileUploader.resetFile();
    },
  };
};
