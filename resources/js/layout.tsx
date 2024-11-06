import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { usePage } from "@inertiajs/inertia-react";
import CookieConsent from "react-cookie-consent";
const RootLayout = ({ children }) => {
    const page = usePage();
    return (
        <div
            className="root-layout "
            dir={page.props.lang == "ar" ? "rtl" : "ltr"}
        >
            <Navbar />
            <div>{children}</div>
            <CookieConsent
                location="bottom"
                buttonText="Accept"
                declineButtonText="Decline"
                cookieName="userConsent"
                hideOnAccept={true}
                enableDeclineButton={true}
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                expires={150} // Days until cookie expires
            >
                This website uses cookies to enhance the user experience.
            </CookieConsent>
            <Footer />
        </div>
    );
};

export default RootLayout;
