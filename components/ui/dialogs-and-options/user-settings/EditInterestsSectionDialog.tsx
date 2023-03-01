import { SegmentsCheckBoxList } from "../../pages/ads/ad-form-items/SegmentsCheckBoxList";

export const EditInterestsSectionDialog = () => {
  return (
    <div className="p-5 space-y-2">
      <h1 className="font-medium">Modifica tus intereses</h1>
      <SegmentsCheckBoxList
        segmentsSelected={["tecnología"]}
        segments={["tecnología", "salud", "finanzas", "economía", "fitness"]}
        inputName="check"
        onChange={() => {}}
      />
    </div>
  );
};
