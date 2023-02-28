import { ReactElement } from "react";

export type DialogContentSection = "primary" | "secondary";
export type DialogContentSections = Record<
  DialogContentSection,
  ReactElement | ReactElement[]
>;
export type DialogVisibility = DialogContentSection | "default";

interface IAnimatedContentProps {
  visit: DialogVisibility;
  sections: DialogContentSections;
}

export const DialogAnimatedContentItem = ({
  visit = "default",
  sections,
}: IAnimatedContentProps) => {
  const isSecondary = visit == "secondary";
  const isDefault = visit == "default";

  const animatePrimaryContent = isDefault
    ? ""
    : isSecondary
    ? "animate-slideLeftFromVisible"
    : "animate-slideLeftFromVisibleRev";

  const animateSecondaryContent = isSecondary
    ? "animate-slideLeftFromHidden"
    : "animate-slideLeftFromHiddenRev";

  return (
    <div className={`h-full bg-white overflow-y-scroll scrollbar-hide flex`}>
      <div className="w-full relative transition-all">
        <div className={`${animatePrimaryContent} w-full`}>
          {sections["primary"]}
        </div>
        <div className={`${animateSecondaryContent} w-full absolute top-0`}>
          {sections["secondary"]}
        </div>
      </div>
    </div>
  );
};
