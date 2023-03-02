import { CardItem } from "@/components/ui/items/CardItem";
import { ReactElement } from "react";

export function DataCard({
  children,
  title,
}: {
  title: string;
  children: ReactElement;
}) {
  return (
    <CardItem>
      <div className="inline-flex items-center space-x-5">
        <div className="flex-items-center text-center">
          <p className="text-gray-500">{title}</p>
          {children}
        </div>
      </div>
    </CardItem>
  );
}
