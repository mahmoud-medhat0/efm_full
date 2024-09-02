import { useState } from 'react';
import WelcomeTab from "../../../../components/dashboard/welcome/WelcomeTab";
import { ArrowsRightLeftIcon } from '@heroicons/react/20/solid';
import Input from '../../../../components/schema/Input';
import Button from '../../../../components/schema/Button';
import DashboardLayout from "../../../../Pages/settings/Layout";
import { usePage } from "@inertiajs/inertia-react";
import { toast } from "react-hot-toast";
const ConvertPointsPage = () => {
  const { points } = usePage().props;
  const [inputValue, setInputValue] = useState(0);
  const [convertedValue, setConvertedValue] = useState(0);
  const [isPointsToUsd, setIsPointsToUsd] = useState(true);
  const exchangeRate = 30;

  const handleConversion = (value: number) => {
    if (isPointsToUsd) {
      setConvertedValue(value / exchangeRate);
    } else {
      setConvertedValue(0);
    }
  };

  return (
    <DashboardLayout>
    <div className="w-full h-auto mt-20">
      <WelcomeTab />
      <div className="w-full px-2 py-12 sm:px-0">
        <h3 className="text-2xl mb-4">Convert Points</h3>
        <div className='w-full flex flex-row items-center justify-between relative space-x-5'>
          <div className="w-full flex flex-col space-y-2 pb-1">
            <label htmlFor="OneInput" className="text-black text-lg">
              {isPointsToUsd ? "Enter amount of points" : "Enter amount in USD"}
            </label>
            <Input
              id='OneInput'
              type="number"
              min={0}
              value={inputValue}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value > points) {
                  toast.error("You don't have enough points");
                } else {
                  setInputValue(value);
                  handleConversion(value);
                }
              }}
              placeholder={isPointsToUsd ? "Enter amount of points" : "Enter amount in USD"}
              className="w-full border-[1px] border-gray-300 shadow-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary rounded-lg px-3 py-3 text-md bg-transparent duration-200"
            />
          </div>
          <div className='absolute right-[48%] top-[44%] bg-primary p-2 rounded-full cursor-pointer'>
            <ArrowsRightLeftIcon className='w-6 h-6 text-white' />
          </div>
          <div className="w-full flex flex-col space-y-2 pb-1">
            <label htmlFor="TwoInput" className="text-black text-lg">
              {isPointsToUsd ? "Converted amount in USD" : "Converted amount of points"}
            </label>
            <input
              id='TwoInput'
              type="number"
              value={convertedValue}
              readOnly
              placeholder={isPointsToUsd ? "Converted amount in USDs" : "Converted amount of points"}
              className="w-full border-[1px] border-gray-300 shadow-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-md bg-transparent duration-200"
            />
          </div>
        </div>
        <Button fullWidth className='mt-5'>Submit</Button>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default ConvertPointsPage;
