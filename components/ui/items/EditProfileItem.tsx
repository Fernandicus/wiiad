type Size = "sm" | "md";

export const EditProfilePic = ({
  profilePic,
  size = "sm",
}: {
  profilePic: string;
  size?: Size;
}) => {
  const imageSize = size === "sm" ? "h-16 w-16" : "h-24 w-24";
  return (
    <div className={imageSize}>
      <img
        src={profilePic}
        className={`${imageSize} hover:cursor-pointer rounded-full  object-cover hover:opacity-70 transition ease-in `}
      ></img>
    </div>
  );
};
