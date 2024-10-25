import React from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { usePage } from "@inertiajs/inertia-react";
const RootLayout = ({ children }) => {
  const page = usePage();
  return (
    <div className="root-layout" dir={page.props.lang=='ar' ? "rtl" : "ltr"}>
      <Navbar />
      <div>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;