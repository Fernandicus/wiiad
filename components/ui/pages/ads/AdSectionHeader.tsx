import { OptionsItem } from "../../dialogs-and-options/OptionsItem";
import { AddIcon } from "../../icons/AddIcon";
import { SectionHeader } from "../items/SectionHeader";
import { CreateAdOptions } from "./CreateAdOptions";

interface IAdSectionHeaderProps {
  titleLabel: string;
  descriptionLabel: string;
  onCreateBanner(): void;
  onCreateVideo(): void;
}

export const AdSectionHeader = ({
  descriptionLabel,
  titleLabel,
  onCreateBanner,
  onCreateVideo,
}: IAdSectionHeaderProps) => {
  const ButtonContent = (
    <div className="flex items-center space-x-1">
      <div className="stroke-2 w-4">
        <AddIcon />
      </div>
      <span>Crear anuncio</span>
    </div>
  );

  return (
    <SectionHeader titleLable={titleLabel} descriptionLabel={descriptionLabel}>
      <OptionsItem>
        {ButtonContent}
        <CreateAdOptions
          onCreateBanner={onCreateBanner}
          onCreateVideo={onCreateVideo}
        />
      </OptionsItem>
    </SectionHeader>
  );
};
