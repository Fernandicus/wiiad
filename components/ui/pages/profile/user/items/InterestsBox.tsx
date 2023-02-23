import { useMemo, useState } from "react";
import { InterestItem } from "./InterestItem";

export const InterestBox = ({ interests }: { interests: string[] }) => {
  const interestsSet = new Set(interests);
  const [filteredInterests, setFilteredInterests] = useState<string[]>([]);

  useMemo(() => {
    interestsSet.forEach((val1, val2, set) => {
      setFilteredInterests((prev) => [...prev, val2]);
    });
  }, []);

  return (
    <div className="py-10 space-y-2 max-w-xl">
      <p className="text-gray-500 ">Tus intereses:</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {filteredInterests.map((interest) => {
          return <InterestItem key={interest} interest={interest} />;
        })}
      </div>
    </div>
  );
};
