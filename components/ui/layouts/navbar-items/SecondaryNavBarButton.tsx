import Link from "next/link";

interface ISecondaryNavBarButton {
  queryUrl?: string;
  label: string;
  isActive: boolean;
  onClick(): void;
}

export const SecondaryNavBarButton = ({
  queryUrl,
  label,
  isActive,
  onClick,
}: ISecondaryNavBarButton) => {
  return (
    <Link
      onClick={onClick}
      href={queryUrl ? `#${queryUrl}` : ""}
      className={`${
        isActive ? "text-sky-500" : "text-gray-600"
      } font-medium text-sm`}
    >
      {label}
    </Link>
  );
};
