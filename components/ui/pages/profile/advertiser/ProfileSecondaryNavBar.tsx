import { SecondaryNavBarButton } from "@/components/ui/layouts/navbar-items/SecondaryNavBarButton";
import { SecondaryNavBarItem } from "@/components/ui/layouts/navbar-items/SecondaryNavBarItem";

export type TProfileSeconadaryNavBar = "facturation" | "profile";

export const ProfileSecondaryNavBar = ({
  selectedPage,
  onClick,
}: {
  selectedPage: TProfileSeconadaryNavBar;
  onClick(page: TProfileSeconadaryNavBar): void;
}) => {
  const isProfile = !selectedPage || selectedPage === "profile" ? true : false;
  const isFacturation = selectedPage === "facturation" ? true : false;

  return (
    <SecondaryNavBarItem>
      <div className="space-x-5">
        <SecondaryNavBarButton
          isActive={isProfile}
          label="Perfil"
          onClick={() => onClick("profile")}
          queryUrl=""
        />
        <div className="inline-block text-slate-300 font-thin">/</div>
        <SecondaryNavBarButton
          isActive={isFacturation}
          label="Facturación"
          onClick={() => onClick("facturation")}
          queryUrl="facturation"
        />
      </div>
    </SecondaryNavBarItem>
  );
};
