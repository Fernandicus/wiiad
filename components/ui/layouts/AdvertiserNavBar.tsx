import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Logout } from "../login/Logout";
import { NavBarButton } from "./navbar-items/NavBarButton";
import { NavBarItem } from "./navbar-items/NavBarItem";

export type TAdvertiserNavPages = "profile" | "ads" | "campaigns" | undefined;

export const AdvertiserNavBar = () => {
  const [activePage, setActivePage] = useState<TAdvertiserNavPages>();
  const router = useRouter();

  const isActive = (page: TAdvertiserNavPages): boolean =>
    page === activePage ? true : false;

  useEffect(() => {
    const paths = router.pathname.split("/").splice(1);
    const page = paths[0] as TAdvertiserNavPages;
    setActivePage(page);
  }, [router.pathname]);

  return (
    <NavBarItem>
      <div className="grid grid-cols-2 max-w-5xl m-auto">
        <div className="space-x-5 flex">
          <NavBarButton
            onClick={() => setActivePage("profile")}
            isActive={isActive("profile")}
            page="profile"
            label="Perfil"
          />
          <NavBarButton
            onClick={() => setActivePage("ads")}
            isActive={isActive("ads")}
            page="ads"
            label="Anuncios"
          />
          <NavBarButton
            onClick={() => setActivePage("campaigns")}
            isActive={isActive("campaigns")}
            page="campaigns"
            label="Campañas"
          />
        </div>
        <div className="flex justify-end">
          <Logout />
        </div>
      </div>
    </NavBarItem>
  );
};
