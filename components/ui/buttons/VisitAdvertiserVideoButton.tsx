import Link from "next/link";

export const VisitAdvertiserVideoButton = ({
  adRedirectionUrl,
}: {
  adRedirectionUrl: string;
}) => {
  return (
    <Link
      style={{ width: "110px" }}
      className="inline-block text-white text-xs bg-black/20 p-1 rounded-md"
      href={adRedirectionUrl}
    >
      Visitar anunciante
    </Link>
  );
};
