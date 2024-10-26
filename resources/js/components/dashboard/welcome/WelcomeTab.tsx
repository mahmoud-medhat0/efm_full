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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg shadow-md ">
        {/* القسم الأول: محتوى مرحباً */}
        <div className="col-span-2 sm:col-span-2 flex flex-col justify-center text-center ml-40 ">
          <h1 className="text-2xl font-bold text-black fs-1">
            Welcome, <span>{user.name.split(" ")[0]}</span>
            <span className="ml-1">{user.name.split(" ")[1]}</span>
          </h1>
        </div>
  
        {/* القسم الثاني: معلومات العضوية */}
        <div className="col-span-2 sm:col-span-2 flex flex-row justify-between">
          <div className="flex flex-col w-1/2 pr-2">
            <h4 className="text-xl text-black font-bold">
              Your Membership:
              <br /> {/* Add a line break here */}
              <span className="text-primary font-semibold">
                {user.membership?.name ?? "Free"}
              </span>
            </h4>
            {user.membership == null && (
              <Link
                href={route("client.dashboard.membership")}
                className="flex items-center gap-2 text-lg text-primary hover:underline mt-2"
              >
                <ArrowUpCircleIcon className="text-primary w-5 h-5" />
                Upgrade Account
              </Link>
            )}
          </div>
  
          {/* القسم الثالث: رابط الإحالة */}
          <div className="flex flex-col w-1/2 pl-2">
            <h3 className="flex items-center gap-2 text-lg text-gray-700 font-bold">
              <LinkIcon className="text-primary w-5 h-5 font-bold" />
              Your referral link:
            </h3>
            <input
              readOnly
              className="cursor-pointer mt-2 border border-gray-300 rounded-md p-2 w-full text-lg font-bold"
              value={`https://www.efmhub.com/ref/${user.username}`}
            />
          </div>
        </div>
  
        {/* القسم الرابع: الصورة على الجانب الأيمن */}
        <div className="col-span-1 flex justify-center items-center">
          <img
            className="w-16 h-28 sm:w-36 sm:h-36 rounded-full cursor-pointer object-cover "
            src={accImg}
            alt="account"
          />
        </div>
      </div>
    );
  };
  
  export default WelcomeTab;
