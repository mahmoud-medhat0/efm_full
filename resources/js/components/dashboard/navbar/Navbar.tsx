import {
  ArrowLeftStartOnRectangleIcon,
  FingerPrintIcon,
} from "@heroicons/react/20/solid";
import LogoImg from "../../../assets/logo.png";
import EarnMoney from "../../schema/selecters/EarnMoney";
import Help from "../../schema/selecters/Help";
import ProfileBtn from "../../ProfileBtn";
import { usePage, Link } from "@inertiajs/inertia-react";
import { route } from "ziggy-js";

const DashboardNavbar = () => {
  const { auth } = usePage().props;
  const isLoggedIn = usePage().props.authed ? auth.client !== null : false;

  return (
    <nav className="w-full  flex flex-row-reverse justify-between items-center px-4 shadow-md">
      <div className="flex flex-row-reverse items-center gap-4">
        <div className="flex flex-row gap-3">
          {!isLoggedIn ? (
            <div className="flex flex-row gap-3">
              <Link
                className="bg-primary dark:text-white dark:hover:bg-primary/90 text-white py-1.5 px-4 rounded-md flex flex-row justify-center gap-2 duration-300"
                href={route('client.login')}
              >
                Login
                <ArrowLeftStartOnRectangleIcon className="h-6 w-6 text-white" />
              </Link>
              <Link
                className="bg-primary dark:text-white dark:hover:bg-primary/90 text-white py-1.5 px-4 rounded-md flex flex-row justify-center gap-2 duration-300"
                to="/register"
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
      </div>
      <ul className="flex items-center justify-between max-sm:hidden">
        <li className="text-lg duration-200">
          <Link className="text-gray-400 px-3 py-2" href={route('client.dashboard')}>
            Home
          </Link>
        </li>
        {/* <li className="text-lg duration-200">
          <Link className="text-gray-400 px-3 py-2" href={route('client.advertise')}>
            Advertise
          </Link>
        </li>
        <li className="text-lg duration-200">
          <Link className="text-gray-400 px-3 py-2" href={route('client.btc-game')}>
            Bitcoin Game
          </Link>
        </li> */}
        <li className="text-lg duration-200">
          <Link className="text-gray-400 px-3 py-2" href={route('client.referral-contest')}>
            Referral Contest
          </Link>
        </li>
        <EarnMoney />
        <Help />
      </ul>
      <div className="flex flex-row items-center gap-2">
        <Link href={route('client.dashboard')}>
          <img className="w-24 h-24 hoving ml-16" src={LogoImg} alt="logo" />
        </Link>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
