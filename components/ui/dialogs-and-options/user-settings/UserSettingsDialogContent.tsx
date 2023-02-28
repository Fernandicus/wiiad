import { ReactElement } from "react";
import { BoxIcon } from "../../icons/BoxIcon";
import { UserIcon } from "../../icons/UserIcon";
import {
  DialogAnimatedContentItem,
  DialogContentSections,
  DialogVisibility,
} from "../DialogAnimatedContentItem";
import { SectionNavDialog } from "../SectionNavDialog";

interface UserSettingsContentProps {
  visible: DialogVisibility;
  onClickProfile(): void;
  onClickInterests(): void;
  children: ReactElement;
}

export const UserSettingsDialogContent = ({
  visible,
  onClickInterests,
  onClickProfile,
  children,
}: UserSettingsContentProps) => {

  const sections: DialogContentSections = {
    primary: (
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
    ),
    secondary: <>{children}</>,
  };

  return (
    <DialogAnimatedContentItem
      sections={sections}
      visit={visible}
    />
  );
};
