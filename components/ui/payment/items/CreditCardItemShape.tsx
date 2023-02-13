export const CreditCardItemShape = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <div className="relative w-64 h-36 rounded-lg overflow-hidden">
      {children}
    </div>
  );
};
