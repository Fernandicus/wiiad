import { PrimaryButton } from "@/components/ui/buttons/PrimaryButton";
import { SectionHeader } from "../../items/SectionHeader";
import { CardItem } from "../../../items/CardItem";

export const FacturationDetailsSection = () => {
  return (
    <div>
      <SectionHeader
        titleLable="Datos de facturación"
        descriptionLabel="Añade tus datos personales para poder generar facturas"
      >
        <PrimaryButton
          fullWitdth={false}
          type="submit"
          disabled
          onClick={() => {}}
        >
          Guardar cambios
        </PrimaryButton>
      </SectionHeader>
      <CardItem>
        <form>
          <div className="grid grid-cols-3 gap-5 w-full">
            <div className="space-y-2">
              <label className="font-bold">Empresa</label>
              <input
                required
                type="text"
                placeholder="Mi Empresa S.L."
                onChange={() => {}}
                className={`rounded-md px-2 block w-full h-10 border border-gray-300 `}
              />
            </div>
            <div className="space-y-2">
              <label className="font-bold">Dirección</label>
              <input
                required
                type="text"
                onChange={() => {}}
                className={`rounded-md px-2 block w-full h-10 border border-gray-300 `}
              />
            </div>
            <div className="space-y-2">
              <label className="font-bold">Telefono</label>
              <input
                required
                type="text"
                //placeholder="Mi Empresa S.L."
                onChange={() => {}}
                className={`rounded-md px-2 block w-full h-10 border border-gray-300 `}
              />
            </div>
          </div>
        </form>
      </CardItem>
    </div>
  );
};
