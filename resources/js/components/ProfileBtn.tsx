import { Popover, Transition } from "@headlessui/react";
import {
  ArrowLeftEndOnRectangleIcon,
  ChartBarIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  ShieldCheckIcon,
  TvIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "@inertiajs/inertia-react";
import toast from "react-hot-toast";
import axios from "axios";
import { route } from "ziggy-js";
import { Inertia } from "@inertiajs/inertia";
export default function ProfileBtn() {

  const handleLogout = () => {
    axios.post(route("client.logout")).then(() => {
      setTimeout(() => {
        Inertia.get(route("client.login"));
        toast.success("Your are Loggedout!");
      }, 1500);
    });
  };

  return (
    <div className="w-full max-w-sm px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "text-white" : "text-white/90"}
                group inline-flex items-center rounded-md bg-primary px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
            >
              <div className="flex items-center gap-2">
                <UserCircleIcon className="w-6 h-6" />
                <span className="text-sm">test</span>
              </div>
              <ChevronDownIcon
                className={`${open ? "text-[#ffe6d0cc]" : "text-[#ffe6d0cc]/70"}
                  ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:[#ffe6d0cc]/80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-3 sm:px-0 lg:max-w-xs">
                <div className="bg-gray-50 overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 z-20">
                  <div className="pt-2 px-2">
                    <Link
                      href={route("client.dashboard")}
                      className="flow-root rounded-md px-2 py-2 transition hover:bg-[#ebe7e7] ease-in-out duration-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                    >
                      <span className="flex items-center gap-3">
                        <TvIcon className="w-5 h-5 text-primary" />
                        <span className="text-base font-medium text-gray-900">
                          Dashboard
                        </span>
                      </span>
                    </Link>
                  </div>
                  <div className="bg-gray-200 h-[1px] my-1 ml-5" />
                  <div className=" px-2">
                    <Link
                      href={route('client.dashboard')}
                      className="flow-root rounded-md px-2 py-2 transition hover:bg-[#ebe7e7] ease-in-out duration-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                    >
                      <span className="flex items-center gap-3">
                        <ChartBarIcon className="w-5 h-5 text-primary" />
                        <span className="text-base font-medium text-gray-900">
                          Advertiser Panel
                        </span>
                      </span>
                    </Link>
                  </div>
                  <div className="bg-gray-200 h-[1px] my-1 ml-5" />
                  <div className=" px-2">
                    <Link
                      to="/dashboard/settings"
                      className="flow-root rounded-md px-2 py-2 transition hover:bg-[#ebe7e7] ease-in-out duration-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                    >
                      <span className="flex items-center gap-3">
                        <Cog8ToothIcon className="w-5 h-5 text-primary" />
                        <span className="text-base font-medium text-gray-900">
                          Personal Settings
                        </span>
                      </span>
                    </Link>
                  </div>
                  <div className="bg-gray-200 h-[1px] my-1 ml-5" />
                  <div className=" px-2">
                    <Link
                      to="/dashboard/2fa"
                      className="flow-root rounded-md px-2 py-2 transition hover:bg-[#ebe7e7] ease-in-out duration-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                    >
                      <span className="flex items-center gap-3">
                        <ShieldCheckIcon className="w-5 h-5 text-primary" />
                        <span className="text-base font-medium text-gray-900">
                          Two Factor Authentication
                        </span>
                      </span>
                    </Link>
                  </div>
                  <div className="bg-gray-200 h-[1px] my-1 ml-5" />
                  <div className="mb-2 px-2">
                    <Link
                      to="/"
                      onClick={handleLogout}
                      className="flow-root rounded-md px-2 py-2 transition hover:bg-[#ebe7e7] ease-in-out duration-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                    >
                      <span className="flex items-center gap-3">
                        <ArrowLeftEndOnRectangleIcon className="w-5 h-5 text-red-600" />
                        <span className="text-base font-medium text-red-600">
                          Logout
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
