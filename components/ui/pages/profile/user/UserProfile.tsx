import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { UserProfileSection } from "./UserProfileSection";
import { useReferral } from "@/components/hooks/user/referral/useReferral";
import { SectionHeader } from "../../items/SectionHeader";
import { SegmentsCheckBoxList } from "../../ads/ad-form-items/SegmentsCheckBoxList";
import { PrimaryButton } from "@/components/ui/buttons/PrimaryButton";
import { InputTextField } from "@/components/ui/forms/items/InputTextField";
import { EditProfilePic } from "@/components/ui/items/EditProfileItem";
import { CloseIcon } from "@/components/ui/icons/CloseIcon";

interface Props {
  user: IUserPrimitives;
}

export function UserProfile({ user }: Props) {
  const { campaignsWatched, totalBalance, totalReferrers } = useReferral();

  return (
    <>
      <div className="h-full flex items-center justify-center">
        <UserProfileSection
          campaignsWatched={campaignsWatched}
          totalBalance={totalBalance}
          totalReferrers={totalReferrers}
          user={user}
        />

        <div className="fixed top-0 py-10 bg-slate-700/20 w-full h-full">
          <div className="relaitve w-full max-w-lg mx-auto h-full overflow-hidden bg-white p-5 rounded-lg">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex space-x-5 items-center">
                <button
                  onClick={() => {}}
                  className="w-6 h-auto hover:text-sky-500"
                >
                  <CloseIcon />
                </button>

                <div>
                  <h1 className="font-bold text-2xl text-gray-700">Ajustes</h1>
                  {/*  <p className="text-gray-600">{descriptionLabel}</p> */}
                </div>
              </div>
              <PrimaryButton fullWitdth={false} type="button">
                Guardar
              </PrimaryButton>
            </div>

            <div className="h-full overflow-auto space-y-10">
              <div className=""></div>
              <div className="space-y-5">
                <div className="flex justify-center">
                  <EditProfilePic profilePic={user.profilePic} size="md" />
                </div>

                <div className="w-full space-y-5">
                  <InputTextField type="text" label="Alias" value={user.name} />
                  <InputTextField
                    type="text"
                    label="Email"
                    value={user.email}
                  />
                </div>
              </div>
              <hr />
              <div className="space-y-5">
                <SectionHeader
                  titleLable="Intereses"
                  descriptionLabel="Recibe anuncios relevantes seleccionando aquellas categorías que más te interesen"
                />
                <SegmentsCheckBoxList
                  inputName="names"
                  onChange={() => {}}
                  segments={["tech", "finanzas", "fitness", "salud", "cultura"]}
                  segmentsSelected={["tech", "finanzas"]}
                />
                <SegmentsCheckBoxList
                  inputName="names"
                  onChange={() => {}}
                  segments={["tech", "finanzas", "fitness", "salud", "cultura"]}
                  segmentsSelected={["tech", "finanzas"]}
                />
                <SegmentsCheckBoxList
                  inputName="names"
                  onChange={() => {}}
                  segments={["tech", "finanzas", "fitness", "salud", "cultura"]}
                  segmentsSelected={["tech", "finanzas"]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
