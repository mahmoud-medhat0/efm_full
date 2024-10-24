import accImg from "../../../assets/dev.jpg";
import { Link } from "@inertiajs/inertia-react";
import { ArrowUpCircleIcon, LinkIcon } from "@heroicons/react/20/solid";
import { usePage } from "@inertiajs/inertia-react";
import React from "react";
import { route } from "ziggy-js";
const WelcomeTab = () => {
    const page = usePage();
    const user = page.props.auth.client;
    return (
        <div className="w-full p-4 rounded-lg shadow-md">
            <div className="w-[300px]">
                <div className="flex flex-row justify-between items-center">
                    <img
                        className="w-16 h-16 rounded-full cursor-pointer"
                        src={accImg}
                        alt="account"
                    />
                    <div className="flex flex-col">
                        <h2 className="text-black text-2xl">
                            Welcome, {user.name}!
                        </h2>
                        <h4 className="text-black text-lg">
                            You Membership{" "}
                            <span className="text-primary">
                                {user.membership?.name ?? "Free"}
                            </span>
                            .
                        </h4>
                    </div>
                </div>
                <div className="ml-[90px] mt-5">
                    {user.membership == null && (
                        <Link
                            href={route("client.dashboard.membership")}
                            className="flex flex-row items-center gap-2 text-lg mb-3"
                        >
                            <ArrowUpCircleIcon className="text-primary w-6 h-6" />{" "}
                            Upgrade Account
                        </Link>
                    )}
                    <div>
                        <h3 className="flex flex-row items-center gap-2 mb-1">
                            <LinkIcon className="text-primary w-6 h-6" /> Your
                            referral link:
                        </h3>
                        <input
                            disabled
                            className="ref cursor-pointer ml-9"
                            value={`https://www.efmhub.com/ref/${user.username}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeTab;
