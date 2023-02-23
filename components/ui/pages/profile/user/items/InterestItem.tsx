import { CloseIcon } from "@/components/ui/icons/CloseIcon";
import { useEffect, useState } from "react";

export const InterestItem = ({ interest }: { interest: string }) => {
  return (
    <div className="inline-block text-gray-500 border border-gray-300 rounded-full px-3 py-1">
      <div className="flex items-center space-x-2">
        <p className="peer-hover:text-red-500">{interest}</p>
      </div>
    </div>
  );
};
