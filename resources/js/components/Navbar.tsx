import React from "react"; // Added this line
import { Link } from "@inertiajs/inertia-react";
import { route } from "ziggy-js";
import {
    ArrowLeftStartOnRectangleIcon,
    FingerPrintIcon,
} from "@heroicons/react/20/solid";
import LogoImg from "../assets/logo.png";
import EarnMoney from "./schema/selecters/EarnMoney";
import Help from "./schema/selecters/Help";
import ProfileBtn from "./ProfileBtn";
import { usePage } from "@inertiajs/inertia-react";
import UK from "../assets/uk.png";
import UAE from "../assets/uae.png";
import { Inertia } from "@inertiajs/inertia";
import { translate } from "../utils/functions";
const Navbar = () => {
    const page = usePage();
    const { auth } = page.props;
    const isLoggedIn = usePage().props.authed ? auth.client !== null : false;
    const handleChangeLang = (lang: string) => {
        Inertia.visit(route("client.set-lang", { lang }));
    };
    return (
        <nav className="fixed top-0 z-50 w-full py-5 flex flex-row-reverse justify-between items-center px-20 shadow-md bg-[#f9f9f9]">
            <div className="flex flex-row-reverse items-center gap-4">
                {!isLoggedIn ? (
                    <div className="flex flex-row gap-3">
                        <Link
                            className="bg-primary dark:text-white dark:hover:bg-primary/90 text-white py-1.5 px-4 rounded-md flex flex-row justify-center gap-2 duration-300"
                            href={route("client.login")}
                        >
                            {window.translate("navbar.login")}
                            <ArrowLeftStartOnRectangleIcon className="h-6 w-6 text-white" />
                        </Link>
                        <Link
                            className="bg-primary dark:text-white dark:hover:bg-primary/90 text-white py-1.5 px-4 rounded-md flex flex-row justify-center gap-2 duration-300"
                            href={route("client.register")}
                        >
                            {window.translate("navbar.register")}
                            <FingerPrintIcon className="h-6 w-6 text-white" />
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-row gap-3">
                        <ProfileBtn />
                    </div>
                )}
                {/* <button
                    title={"navbar.lang"}
                    className={`language-button duration-100 ${page.props.lang === "en" ? "english" : "arabic"
                        }`}
                    onClick={() =>
                        handleChangeLang(page.props.lang === "en" ? "ar" : "en")
                    }
                >
                    {page.props.lang === "en" ? (
                        <img className="w-6" src={UK} alt="english" />
                    ) : (
                <img className="w-6" src={UAE} alt="arabic" />
              )}
            </button> */}

            </div>
            <ul className="flex items-center justify-between max-sm:hidden">
                <li className="text-lg duration-200">
                    <Link className="text-gold px-3 py-2" href={route('client.home')}>
                        {translate("home.title")}
                    </Link>
                </li>
                {/* <li className="text-lg duration-200">
                    <Link className="text-gray-400 px-3 py-2" href={route('client.advertise')}>
                        {translate("home.advertise")}
                    </Link>
                </li> */}
                
                <li className="text-lg duration-200">
                    <Link className="text-gold px-3 py-2" href={route("client.home")+'#about'}>
                        {translate("home.about-us")}
                    </Link>
                </li>
                <li className="text-lg duration-200">
                    <Link
                        className="text-gold px-3 py-2"
                        href={route('client.referral-contest')}
                    >
                        {translate("home.referral-contest")}
                    </Link>
                </li>
                <li className="text-lg duration-200">
                    <Link href={route('client.home') + '#membership'} className="text-gold px-3 py-2">
                        {translate("home.membership")}
                    </Link>
                </li>
                <li className="text-lg duration-200">
                    <Link href={route('client.home') + '#referral'} className="text-gold px-3 py-2">
                        {translate("home.referral")}
                    </Link>
                </li>
                {/* <EarnMoney /> */}
                {/* <Help /> */}
            </ul>
            <div className="flex flex-row gap-2">
                <Link href={route('client.dashboard')}>
                    <img
                        className="w-22 h-20 ml-16" // تم زيادة حجم الصورة
                        src={LogoImg}
                        alt={translate("home.logo")}
                    />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
