import { useMemo, useState } from "react";
import { InterestItem } from "./InterestItem";

export const InterestBox = ({ interests }: { interests: string[] }) => {
  
  return (
    <div className=" space-y-2 ">
      <p className="text-gray-700 text-center">Tus intereses:</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {interests.map((interest) => {
          return <InterestItem key={interest} interest={interest} />;
        })}
      </div>
    </div>
  );
};
