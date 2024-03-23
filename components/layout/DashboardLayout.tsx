import { NextPage } from "next";
import { ReactNode } from "react";
import Navbar from "./Nav";
import SideNav from "./SideNav";

type DashboardProps = {
  children: ReactNode;
  isAuthenticated: boolean;
  onLogout?: () => void;
};

const DashboardLayout: NextPage<DashboardProps> = ({
  isAuthenticated,
  children,
}) => {
  return (
    <main>
      <div className="flex flex-col h-screen">
        <Navbar authenticated={isAuthenticated} />
        <div className="flex flex-row h-screen">
          <SideNav />
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
