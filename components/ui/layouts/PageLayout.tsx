interface IPageLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export const PageLayout = ({ children }: IPageLayoutProps) => {
  return (
    <div className="bg-slate-100 min-h-screen w-full pb-20">
      <div className="max-w-5xl mx-auto">{children}</div>
    </div>
  );
};
