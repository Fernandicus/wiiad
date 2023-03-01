import { useNotification } from "@/components/hooks/useNotification";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { replaceInputTextSpacesWith } from "@/src/utils/helpers";
import { useEffect } from "react";
import { PrimaryButton } from "../../../buttons/PrimaryButton";
import { ImageInputLoader } from "../../ads/ad-form-items/ImageInputLoader";
import { useFileUploader } from "../../ads/hooks/useFileUploader";
import { SectionHeader } from "../../items/SectionHeader";
import { CardItem } from "../../../items/CardItem";
import { useUpdateProfileDataForm } from "./hooks/useUpdateProfileDataForm";
import { EditProfilePic } from "@/components/ui/items/EditProfileItem";

interface IProfileDataSectionProps {
  user: IUserPrimitives;
}

export const ProfileDataSection = ({ user }: IProfileDataSectionProps) => {
  const fileMaxSize = 1020 * 1020;
  const { filePreview, onSelectFile, errorMessage, hasError } = useFileUploader(
    { fileMaxSize }
  );

  const { setNotification } = useNotification();

  const { error, handle, input, isSubmitting } = useUpdateProfileDataForm(user);

  const emailHasChanged = input.values.email !== user.email;
  const nameHasChanged = input.values.name !== user.name;
  const profileHasChanged = input.values.profilePic !== user.profilePic;
  const isDisabled =
    emailHasChanged || nameHasChanged || profileHasChanged ? false : true;

  useEffect(() => {
    if (errorMessage)
      setNotification({ message: errorMessage, status: "error" });
  }, [hasError, errorMessage]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          if (!isSubmitting) {
            handle.submit(e, { file: filePreview });
          }
        }}
      >
        <SectionHeader
          titleLable="Información básica"
          descriptionLabel="Revisa la información de tu perfil y actualiza tus datos personales si fuese necesario"
        >
          <PrimaryButton
            isLoading={isSubmitting}
            disabled={isDisabled}
            fullWitdth={false}
            type="submit"
          >
            Guardar cambios
          </PrimaryButton>
        </SectionHeader>
        <CardItem>
          <div className="flex space-x-5">
            <div className="flex items-center">
              <div className="w-16 h-16">
                <ImageInputLoader
                  required={false}
                  inputName={input.names.profilePic}
                  filePreview={filePreview}
                  onSelectFile={(e) => {
                    onSelectFile(e);
                    handle.change(e);
                  }}
                  imageClassName="rounded-full h-16 w-16 object-cover p-0.5 border-2 border-sky-500 hover:opacity-70 transition ease-in"
                >
                  <EditProfilePic profilePic={user.profilePic} />
                </ImageInputLoader>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 w-full">
              <div className="space-y-2 w-full">
                <label className="font-bold">
                  Nombre de marca{" "}
                  <span className="text-red-500 text-xs font-normal">
                    {error.message("name")}
                  </span>
                </label>
                <input
                  required
                  type="text"
                  name={input.names.name}
                  value={input.values.name}
                  onChange={(e) => {
                    e.target.value = replaceInputTextSpacesWith(e, "_");
                    handle.change(e);
                  }}
                  className={`rounded-md px-2 block w-full h-10 border ${
                    error.hasError("name")
                      ? "border-red-300"
                      : "border-gray-300"
                  } `}
                />
              </div>
              <div className="space-y-2 w-full">
                <label className="font-bold">
                  Email{" "}
                  <span className="text-red-500 text-xs font-normal">
                    {error.message("email")}
                  </span>
                </label>
                <input
                  required
                  type="email"
                  name={input.names.email}
                  value={input.values.email}
                  onChange={handle.change}
                  className={`rounded-md px-2 block w-full h-10 border ${
                    error.hasError("email")
                      ? "border-red-300"
                      : "border-gray-300"
                  } `}
                />
              </div>
            </div>
          </div>
        </CardItem>
      </form>
    </div>
  );
};
