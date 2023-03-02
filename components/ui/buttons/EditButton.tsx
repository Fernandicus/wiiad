import { EditIcon } from "@/components/ui/icons/EditIcon";

export const EditButton = ({ onClick }: { onClick(): void }) => {
  return (
    <button className="text-sky-500" onClick={onClick}>
      <div className="w-5 h-5">
        <EditIcon />
      </div>
    </button>
  );
};
