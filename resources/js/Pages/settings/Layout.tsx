import Footer from "../../components/Footer";
import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import DashboardNavbar from "../../components/dashboard/navbar/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="root-layout">
      <DashboardNavbar />
      <div className="flex flex-row justify-between h-full">
        <Sidebar />
        <div className="container">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
