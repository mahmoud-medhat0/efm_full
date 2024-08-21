import { Link } from "react-router-dom";
import WelcomeTab from "../../../../components/dashboard/welcome/WelcomeTab";
import Button from "../../../../components/schema/Button";
import Input from "../../../../components/schema/Input";

const RedeemPage = () => {
  return (
    <div className="w-full h-auto mt-20">
      <WelcomeTab />
      <div className="w-full px-2 py-12 sm:px-0">
        <h3 className="text-lg mb-3">Redeem Coupon Code</h3>
        <form className="space-y-3">
          <div className="space-y-2 pb-1">
            <label htmlFor="code" className="text-black text-xl">
              Coupon code
            </label>
            <Input id="code" />
          </div>
          <div className="flex flex-row gap-3">
            <Button fullWidth>Redeem</Button>
            <Link
              to={"/dashboard/coupons/history"}
              className="w-full flex items-center justify-center rounded-md font-medium text-white duration-500 dark:text-black disabled:bg-indigo-400 disabled:hover:bg-indigo-400 disabled:cursor-not-allowed bg-gray-400 text-dark dark:bg-gray-400 dark:text-dark hover:bg-gray-500 dark:hover:bg-gray-500"
            >
              View used coupons
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RedeemPage;
