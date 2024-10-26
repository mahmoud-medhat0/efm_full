import accImg from "../../../assets/character.jpg";
import { Link } from "@inertiajs/inertia-react";
import { ArrowUpCircleIcon, LinkIcon } from "@heroicons/react/20/solid";
import { usePage } from "@inertiajs/inertia-react";
import React from "react";
import { route } from "ziggy-js";
import toast from 'react-hot-toast';
const WelcomeTab = () => {
    const page = usePage();
    const user = page.props.auth.client;
  
    const copyToClipboard = () => {
        const referralLink = `https://www.efmhub.com/register?ref=${user.username}`;
        navigator.clipboard.writeText(referralLink).then(() => {
            toast.success("Referral link copied to clipboard!");
        }).catch(err => {
            toast.error("Failed to copy: ", err);
        });
    };

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
                <div className="flex items-center w-[35rem]">
                  <input
                    readOnly
                    className="cursor-pointer rounded-md p-2 w-full text-lg font-bold border border-primary"
                    value={`https://www.efmhub.com/register?ref=${user.username}`}
                  />
                  <button
                    onClick={copyToClipboard}
                    className="ml-2 bg-primary-700 text-white rounded-md hover:bg-primary-800 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="50px" width="50px" version="1.1" id="Capa_1" viewBox="0 0 512 350" xmlSpace="preserve">
                      <g>
                        <path d="M35,270h45v45c0,8.284,6.716,15,15,15h200c8.284,0,15-6.716,15-15V75c0-8.284-6.716-15-15-15h-45V15   c0-8.284-6.716-15-15-15H35c-8.284,0-15,6.716-15,15v240C20,263.284,26.716,270,35,270z M280,300H110V90h170V300z M50,30h170v30H95   c-8.284,0-15,6.716-15,15v165H50V30z"/>
	                    <path d="M155,120c-8.284,0-15,6.716-15,15s6.716,15,15,15h80c8.284,0,15-6.716,15-15s-6.716-15-15-15H155z"/>
                        <path d="M235,180h-80c-8.284,0-15,6.716-15,15s6.716,15,15,15h80c8.284,0,15-6.716,15-15S243.284,180,235,180z"/>
                        <path d="M235,240h-80c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15h80c8.284,0,15-6.716,15-15C250,246.716,243.284,240,235,240z   "/>
                      </g>
                    </svg>
                  </button>
                </div>
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
