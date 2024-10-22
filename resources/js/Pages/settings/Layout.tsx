import React, { useEffect } from 'react';
import Footer from "../../components/Footer";
import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import DashboardNavbar from "../../components/dashboard/navbar/Navbar";
import devtools from 'devtools-detect';
import DevToolsListener from '../../components/dashboard/DevToolsDetection'; // Import the component

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (devtools.isOpen) {
        alert('Developer tools are open!');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <DevToolsListener />
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
    </>
  );
};

export default DashboardLayout;
