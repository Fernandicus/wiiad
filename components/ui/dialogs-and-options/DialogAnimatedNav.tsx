import { ReactElement } from "react";
import {
  DialogAnimatedContentItem, DialogContentSections,
} from "./DialogAnimatedContentItem";
import { DialogItem } from "./DialogItem";

type DialogAnimatedNavProps = Omit<
  Parameters<typeof DialogItem>[0],
  "children"
> &
  Omit<Parameters<typeof DialogAnimatedContentItem>[0], "sections"> & {
    mainSection: ReactElement | ReactElement[];
    secondarySection: ReactElement | ReactElement[];
  };

export const DialogAnimatedNav = (props: DialogAnimatedNavProps) => {
  const {
    title,
    closeDialog,
    hasBackButton,
    hasCloseButton,
    onBack,
    visit,
    mainSection,
    secondarySection
  } = props;

  const sections: DialogContentSections = {
    main: mainSection,
    secondary: secondarySection,
  };

  return (
    <DialogItem
      title={title}
      closeDialog={closeDialog}
      onBack={onBack}
      hasBackButton={hasBackButton}
      hasCloseButton={hasCloseButton}
    >
      <DialogAnimatedContentItem sections={sections} visit={visit} />
    </DialogItem>
  );
};
