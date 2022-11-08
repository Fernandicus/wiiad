interface AdCardItemProps {
  image: string;
  children?: JSX.Element | JSX.Element[];
}

export const AdCardItem = ({ image, children }: AdCardItemProps) => {
  return (
    <div className="rounded-lg bg-white shadow-xl shadow-slate-200">
      {image.includes(".mp4") ? (
        <video controls className=" rounded-t-lg">
          <source src={image} type="video/mp4" />
          Tu navegador no el formato de video mp4
        </video>
      ) : (
        <img src={image} className="bg-white/70 rounded-t-lg"></img>
      )}
      <div className="p-3 space-y-2">{children}</div>
    </div>
  );
};
