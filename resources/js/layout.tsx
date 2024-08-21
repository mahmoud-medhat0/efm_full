import React from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const RootLayout = ({ children }) => {
  return (
    <div className="root-layout">
      <Navbar />
      <div>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;