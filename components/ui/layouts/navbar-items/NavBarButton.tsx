import Link from "next/link";
import { useEffect, useState } from "react";
import { TAdvertiserNavPages } from "../AdvertiserNavBar";

interface INavBarButton {
  page: TNavBarPages;
  label: string;
  isActive: boolean;
  onClick(): void;
}

type TNavBarPages = TAdvertiserNavPages;

export const NavBarButton = ({
  page,
  label,
  isActive,
  onClick,
}: INavBarButton) => {
  return (
    <Link
      onClick={onClick}
      href={`/${page}`}
      className={`${
        isActive
          ? "text-sky-500 underline underline-offset-4 decoration-2 decoration-sky-500"
          : "text-gray-600 "
      } font-medium`}
    >
      {label}
    </Link>
  );
};
