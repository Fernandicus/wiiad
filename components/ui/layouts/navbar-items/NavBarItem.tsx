export const NavBarItem = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <nav className="w-full mb-5 py-3 border-b border-gray-200">{children}</nav>
  );
};
