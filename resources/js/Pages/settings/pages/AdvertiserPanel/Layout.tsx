import { Outlet } from "react-router-dom";
import Footer from "../../../../components/Footer";
import Sidebar from "../../../../components/dashboard/sidebar/Sidebar";
import DashboardNavbar from "../../../../components/dashboard/navbar/Navbar";

const ADSLayout = () => {
  return (
    <div className="root-layout">
      <DashboardNavbar />
      <div className="flex flex-row justify-between h-full">
        <Sidebar />
        <div className="container">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ADSLayout;
