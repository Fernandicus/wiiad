import { FormEvent, ReactElement } from "react";
import {
  DialogAnimatedContentItem,
  DialogContentSections,
} from "./DialogAnimatedContentItem";
import { DialogItem } from "./DialogItem";

type DialogAnimatedNavProps = Parameters<typeof DialogItem>[0] &
  Omit<Parameters<typeof DialogAnimatedContentItem>[0], "sections"> & {
    secondarySection: ReactElement | ReactElement[];
    disabledActionBtn?: boolean;
    loadingActionBtn: boolean;
    onSubmit(e: FormEvent<HTMLFormElement>): void;
  };

export const DialogAnimatedNav = (props: DialogAnimatedNavProps) => {
  const {
    title,
    closeDialog,
    hasBackButton,
    actionButton,
    onBack,
    visit,
    secondarySection,
    disabledActionBtn,
    loadingActionBtn,
    onSubmit,
    children,
  } = props;

  const sections: DialogContentSections = {
    main: children,
    secondary: secondarySection,
  };

  return (
    <DialogItem
      onSubmit={onSubmit}
      disabledActionBtn={disabledActionBtn}
      loadingActionBtn={loadingActionBtn}
      title={title}
      closeDialog={closeDialog}
      onBack={onBack}
      hasBackButton={hasBackButton}
      actionButton={actionButton}
    >
      <DialogAnimatedContentItem sections={sections} visit={visit} />
    </DialogItem>
  );
};
