import { Notification } from "../notifications/Notification";
import { NavBar } from "./App";

interface IPageLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export const PageLayout = ({ children }: IPageLayoutProps) => {
  return (
    <div className="bg-slate-100 min-h-screen w-full pb-20">
      <Notification />
      <div className="max-w-5xl mx-auto">
        <NavBar />
        {children}
      </div>
    </div>
  );
};