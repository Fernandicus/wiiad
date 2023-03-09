interface ReferrerProfileProps {
  referrerProfilePic: string;
  referrerName: string;
}

export const ReferrerProfile = (props: ReferrerProfileProps) => {
  const { referrerName, referrerProfilePic } = props;
  return (
    <div className="space-y-2">
      <div className="w-full flex justify-center">
        <img
          src={referrerProfilePic}
          width={200}
          height={200}
          className="rounded-full h-20 w-20 object-cover"
        ></img>
      </div>
      <p className="">Apolla a {referrerName}</p>
    </div>
  );
};
