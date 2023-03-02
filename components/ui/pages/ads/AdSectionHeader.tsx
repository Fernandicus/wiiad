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
  

  return (
    <SectionHeader titleLable={titleLabel} descriptionLabel={descriptionLabel}>
      <OptionsItem>
        <CreateAdOptions
          onCreateBanner={onCreateBanner}
          onCreateVideo={onCreateVideo}
        />
      </OptionsItem>
    </SectionHeader>
  );
};
