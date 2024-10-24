import { ReactNode } from "react";
import Button from "../schema/Button";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";

interface IProps {
  title: string;
  price: string;
  children: ReactNode;
}

const AdvertiseCards = ({ title, price, children }: IProps) => {
  return (
    <div className="bg-transparent border-[1px] border-hover p-4 rounded-lg shadow-md flex flex-col justify-between">
      <h3 className="text-black text-2xl flex flex-row justify-between items-center mb-1 max-sm:flex-col-reverse max-sm:gap-3">
        {title}
        <span className="bg-transparent p-1 rounded-md cursor-pointer max-sm:text-center">
          {children}
        </span>
      </h3>
      <p className="text-gray-400 mb-6 max-sm:text-center">{price}</p>
      <div className="flex justify-center items-center flex-col mt-auto">
        <Button className="flex flex-row gap-2 w-[150px] text-sm">
          <ShoppingCartIcon className="w-4 h-4" />
          Buy now!
        </Button>
      </div>
    </div>
  );
};

export default AdvertiseCards;
