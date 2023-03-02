import { FacturationDetailsSection } from "./FacturationDetailsSection";
import { InvoicesSection } from "./InvoicesSection";

export const FacturationProfileSection = () => {
  return (
    <div className="space-y-10">
      <FacturationDetailsSection />
      <InvoicesSection />
    </div>
  );
};
