import { NavBar } from "@/components/navBar";
import { SideBar } from "@/components/sideBar";

const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex">
      <SideBar />
      <div className="w-full">
        <NavBar />
        {children}
      </div>
    </div>
  );
};

export default LayoutDashboard;
