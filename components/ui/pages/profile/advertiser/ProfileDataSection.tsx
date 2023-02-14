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
        titleLable="Información básica"
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
            <div className="grid grid-cols-2 gap-5 w-full">
              
              <div className="space-y-2 w-full">
                <label className="font-bold">Nombre de marca</label>
                <input
                  required
                  type="text"
                  value={user.name}
                  onChange={() => {}}
                  className={`rounded-md px-2 block w-full h-10 border border-gray-300 `}
                />
              </div>
              <div className="space-y-2 w-full">
                <label className="font-bold">Email</label>
                <input
                  required
                  type="text"
                  value={user.email}
                  onChange={() => {}}
                  className={`rounded-md px-2 block w-full h-10 border border-gray-300 `}
                />
              </div>
              {/* <div className="space-y-2">
                <label className="font-bold">
                  Web
                </label>
                <input
                  required
                  type="text"
                  placeholder="https://..."
                  onChange={() => {}}
                  className={`rounded-md px-2 block w-full h-10 border border-gray-300 `}
                />
              </div> */}
            </div>
          </div>
        </form>
      </CardItem>
    </div>
  );
};
