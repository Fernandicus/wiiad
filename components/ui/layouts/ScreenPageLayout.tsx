import { ReactElement } from "react";
import { Notification } from "../notifications/Notification";
import { NavBar } from "./App";
import { UserNavBar } from "./UserNavBar";

interface IScreenPageLayoutProps {
  children: ReactElement;
}

export const ScreenPageLayout = ({
  children,
}: IScreenPageLayoutProps) => {
  return (
    <div className="bg-slate-100 max-h-full min-h-screen h-screen w-full pb-20">
      <div className="max-w-5xl mx-auto h-full ">
        <NavBar />
        <section className="w-full h-full">{children}</section>
      </div>
      <Notification />
    </div>
  );
};
