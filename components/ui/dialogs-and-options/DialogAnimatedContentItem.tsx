import { ReactElement } from "react";

type DialogMainSections = "main" | "secondary";

export type DialogContentSections = Record<
  DialogMainSections,
  ReactElement | ReactElement[]
>;

export type DialogViews = DialogMainSections | "default";

interface IAnimatedContentProps {
  visit: DialogViews;
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

  const animateSecondaryContent = isDefault
    ? "translate-x-full"
    : isSecondary
    ? "animate-slideLeftFromHidden"
    : "animate-slideLeftFromHiddenRev";

  return (
    <div className={`h-full bg-white overflow-y-scroll scrollbar-hide flex`}>
      <div className="w-full relative transition-all">
        <div className={`${animatePrimaryContent} w-full`}>
          {sections["main"]}
        </div>
        <div className={`${animateSecondaryContent} w-full absolute top-0`}>
          {sections["secondary"]}
        </div>
      </div>
    </div>
  );
};
