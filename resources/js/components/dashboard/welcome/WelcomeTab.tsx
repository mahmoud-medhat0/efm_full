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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-primary shadow-md">
          {/* القسم الأيسر: محتوى مرحباً */}
          <div className="col-span-2 flex flex-col justify-center text-center sm:text-left ml-10 ">
            <h1 className="text-2xl font-bold text-rom " >
              Welcome, <span>{user.name.split(" ")[0]}</span>
              <span className="ml-1">{user.name.split(" ")[1]}</span>
            </h1>
    
            {/* معلومات العضوية */}
            <div className="flex flex-col mt-4">
              <h4 className="text-xl text-black ">
                Your Membership:
                <span className="text-black font-semibold ml-2">
                  {user.membership?.name ?? "Free"}
                </span>
              </h4>
              {user.membership == null && (
                <Link
                  href={route("client.dashboard.membership")}
                  className="flex items-center gap-2 text-lg text-black hover:underline mt-2"
                >
                  Upgrade Account
                  <ArrowUpCircleIcon className="text-black w-5 h-5" />
                </Link>
              )}
            </div>
    
            {/* رابط الإحالة */}
            {user.membership && (
              <div className="flex flex-col mt-4">
                <h3 className="flex items-center gap-2 text-lg text-primary-700 font-bold">
                  <LinkIcon className="text-primary w-5 h-5" />
                  Your referral link:
                </h3>
                <input
                  readOnly
                  className="cursor-pointer mt-2 rounded-md p-2 w-full text-lg font-bold border border-primary"
                  value={`https://www.efmhub.com/ref/${user.username}`}
                />
              </div>
            )}
          </div>
    
          {/* القسم الأيمن: الصورة */}
          <div className="flex justify-center items-start">
            <img
              className="w-36 h-36 sm:w-48 sm:h-48 rounded-full cursor-pointer object-cover"
              src={accImg}
              alt="account"
            />
          </div>
        </div>
      );
    };
    
    export default WelcomeTab;
