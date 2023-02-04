import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { PrimaryButton } from "../../../buttons/PrimaryButton";
import { SectionHeader } from "../../items/SectionHeader";
import { CardItem } from "./CardItem";

interface IProfileDataSectionProps {
  user: IUserPrimitives;
}

export const ProfileDataSection = ({ user }: IProfileDataSectionProps) => {
  return (
    <div>
      <SectionHeader
        titleLable="Datos personales"
        descriptionLabel="Revisa la información de tu perfil y actualiza tus datos personales si fuese necesario"
      >
        <PrimaryButton disabled fullWitdth={false} type="button">
          Guardar cambios
        </PrimaryButton>
      </SectionHeader>
      <CardItem>
        <form>
          <div className="flex space-x-5">
            <div className="flex items-center">
              <button type="button" className="h-16 w-16">
                <img
                  src={user.profilePic}
                  className="rounded-full h-16 w-16 object-cover p-0.5 border-2 border-sky-500 hover:opacity-70 transition ease-in "
                ></img>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-5 w-full">
              <div className="space-y-2">
                <label className="font-bold">
                  Empresa <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Mi Empresa S.L."
                  /*  value={"Mi Empresa S.L."} */
                  className={`rounded-md px-2 block w-full h-10 border-2 border-red-300 `}
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold">Nombre de marca</label>
                <input
                  required
                  type="text"
                  value={user.name}
                  className={`rounded-md px-2 block w-full h-10 border border-gray-300 `}
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold">Email</label>
                <input
                  required
                  type="text"
                  value={user.email}
                  className={`rounded-md px-2 block w-full h-10 border border-gray-300 `}
                />
              </div>
            </div>
          </div>
        </form>
      </CardItem>
    </div>
  );
};
