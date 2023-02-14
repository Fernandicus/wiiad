import { SectionHeader } from "../../items/SectionHeader";

export const InvoicesSection = () => {
  return (
    <div>
      <SectionHeader
        titleLable="Historial de pagos"
        descriptionLabel="Comprueba y descarga todas tus facturas"
      />
      <p className="text-center">No tienes ninguna factura generada</p>
    </div>
  );
};
