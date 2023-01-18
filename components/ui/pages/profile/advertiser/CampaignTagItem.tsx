type TagColor = "red" | "blue" | "lime" | "orange";

interface ICampaignTag {
  children: JSX.Element | JSX.Element[];
  color: TagColor;
}

export const CampaignTagItem = ({ children, color }: ICampaignTag) => {
  const tagColor =
    color == "blue"
      ? "bg-blue-100 text-blue-600"
      : color == "lime"
      ? "bg-lime-100 text-green-600"
      : color == "orange"
      ? " bg-amber-100 text-amber-600"
      : "bg-red-100 text-red-600";
  return (
    <div
      className={`${tagColor} w-full  py-1 px-2 mx-1 rounded-md text-xs font-medium`}
    >
      {children}
    </div>
  );
};
