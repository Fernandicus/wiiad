export const SecondaryNavBarItem = ({
    children,
  }: {
    children: JSX.Element | JSX.Element[];
  }) => {
    return (
      <nav className="w-full pb-6">{children}</nav>
    );
  };
  