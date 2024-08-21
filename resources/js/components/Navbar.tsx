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

const Navbar = () => {
    const { auth } = usePage().props;
    const isLoggedIn = usePage().props.authed ? auth.client !== null : false;
    return (
        <nav className="w-full py-5 flex flex-row-reverse justify-between items-center px-4 shadow-md bg-[#f9f9f9]">
            <div className="flex flex-row-reverse items-center gap-4">
                {!isLoggedIn ? (
                    <div className="flex flex-row gap-3">
                        <Link
                            className="bg-primary dark:text-white dark:hover:bg-primary/90 text-white py-1.5 px-4 rounded-md flex flex-row justify-center gap-2 duration-300"
                            href={route("client.login")}
                        >
                            Login
                            <ArrowLeftStartOnRectangleIcon className="h-6 w-6 text-white" />
                        </Link>
                        <Link
                            className="bg-primary dark:text-white dark:hover:bg-primary/90 text-white py-1.5 px-4 rounded-md flex flex-row justify-center gap-2 duration-300"
                            href={route("client.register")}
                        >
                            Register
                            <FingerPrintIcon className="h-6 w-6 text-white" />
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-row gap-3">
                        <ProfileBtn />
                    </div>
                )}
            </div>
            <ul className="flex items-center justify-between max-sm:hidden">
                <li className="text-lg duration-200">
                    <Link className="text-gray-400 px-3 py-2" href={route('client.home')}>
                        Home
                    </Link>
                </li>
                <li className="text-lg duration-200">
                    <Link className="text-gray-400 px-3 py-2" href={route('client.advertise')}>
                        Advertise
                    </Link>
                </li>
                <li className="text-lg duration-200">
                    <Link className="text-gray-400 px-3 py-2" href={route('client.btc-game')}>
                        Bitcoin Game
                    </Link>
                </li>
                <li className="text-lg duration-200">
                    <Link
                        className="text-gray-400 px-3 py-2"
                        href={route('client.referral-contest')}
                    >
                        Referral Contest
                    </Link>
                </li>
                <EarnMoney />
                <Help />
            </ul>
            <div className="flex flex-row items-center gap-2">
                <Link href={route('client.home')}>
                    <img
                        className="w-16 h-16 hoving"
                        src={LogoImg}
                        alt="logo"
                    />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
