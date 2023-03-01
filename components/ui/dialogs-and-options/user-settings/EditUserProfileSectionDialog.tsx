import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { replaceInputTextSpacesWith } from "@/src/utils/helpers";
import { InputTextField } from "../../forms/items/InputTextField";
import { EditProfilePic } from "../../items/EditProfileItem";
import { ImageInputLoader } from "../../pages/ads/ad-form-items/ImageInputLoader";
import { useFileUploader } from "../../pages/ads/hooks/useFileUploader";
import { useUpdateProfileDataForm } from "../../pages/profile/advertiser/hooks/useUpdateProfileDataForm";

type UseUpdateProfile = ReturnType<typeof useUpdateProfileDataForm>;
type UseFileUpload = ReturnType<typeof useFileUploader>;

interface IEditUserProfProps {
  user: IUserPrimitives;
  useUpdateProfile: UseUpdateProfile;
  useFileUploader: UseFileUpload;
}

export const EditUserProfileSectionDialog = ({
  user,
  useUpdateProfile,
  useFileUploader,
}: IEditUserProfProps) => {
  const { error, handle, input } = useUpdateProfile;
  const { filePreview, errorMessage, hasError, onSelectFile } = useFileUploader;

  return (
    <div className="p-5 space-y-5">
      <div className="flex justify-center">
        <ImageInputLoader
          onSelectFile={onSelectFile}
          filePreview={filePreview}
          inputName={input.names.profilePic}
          imageClassName="w-[96px] h-[96px] hover:opacity-60 transition duration-150 ease-in object-cover bg-white rounded-full"
          required={false}
        >
          <EditProfilePic profilePic={user.profilePic} size="md" />
        </ImageInputLoader>
      </div>

      <InputTextField
        label="Nombre"
        name={input.names.name}
        value={input.values.name}
        hasError={error.hasError("name")}
        onChange={(e) => {
          e.target.value = replaceInputTextSpacesWith(e, "_");
          handle.change(e);
        }}
        errorMessage={error.message("name")}
      />
      <InputTextField
        label="Email"
        name={input.names.email}
        value={input.values.email}
        hasError={error.hasError("email")}
        onChange={handle.change}
        errorMessage={error.message("email")}
      />
    </div>
  );
};
