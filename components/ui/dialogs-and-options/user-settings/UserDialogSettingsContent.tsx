import { BoxIcon } from "../../icons/BoxIcon";
import { UserIcon } from "../../icons/UserIcon";
import { NavDialogButton } from "../../buttons/NavDialogButton";

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
      <NavDialogButton
        titleLable="Datos de perfil"
        descriptionLabel="Email, nombre y foto de perfil"
        onClick={onClickProfile}
      >
        <div className="w-7">
          <UserIcon />
        </div>
      </NavDialogButton>
      <NavDialogButton
        titleLable="Tus intereses"
        descriptionLabel="Selecciona las categorías que más te interesen"
        onClick={onClickInterests}
      >
        <div className="w-7 h-7">
          <BoxIcon />
        </div>
      </NavDialogButton>
    </>
  );
};
