import { BoxIcon } from "../../icons/BoxIcon";
import { UserIcon } from "../../icons/UserIcon";
import { SectionNavDialog } from "../SectionNavDialog";

interface UserSettingsContentProps {
  onClickProfile(): void;
  onClickInterests(): void;
}

export const UserDialogSettingsContent = ({
  onClickInterests,
  onClickProfile,
}: UserSettingsContentProps) => {

  return (
    <>
      <SectionNavDialog
        titleLable="Datos de perfil"
        descriptionLabel="Email, nombre y foto de perfil"
        onClick={onClickProfile}
      >
        <div className="w-7">
          <UserIcon />
        </div>
      </SectionNavDialog>
      <SectionNavDialog
        titleLable="Tus intereses"
        descriptionLabel="Selecciona las categorías que más te interesen"
        onClick={onClickInterests}
      >
        <div className="w-7 h-7">
          <BoxIcon />
        </div>
      </SectionNavDialog>
    </>
  );
};
