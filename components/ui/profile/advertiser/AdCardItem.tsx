interface AdCardItemProps {
  image: string;
  children?: JSX.Element | JSX.Element[];
}

export const AdCardItem = ({ image, children }: AdCardItemProps) => {
  return (
    <div className="rounded-lg bg-white shadow-xl shadow-slate-200">
      <img
        src={image}
        className="bg-white/70 rounded-t-lg"
      ></img>
      <div className="p-3 space-y-2">{children}</div>
    </div>
  );
};
