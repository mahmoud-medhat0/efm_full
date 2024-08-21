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
    <div className="bg-transparent border-[1px] border-hover min-w-[320px] max-w-[320px] p-4 rounded-lg shadow-md">
      <h3 className="text-black text-2xl flex flex-row justify-between items-center mb-1">
        {title}
        <span className="bg-transparent p-1 rounded-md cursor-pointer">
          {children}
        </span>
      </h3>
      <p className="text-gray-400 mb-6">{price}</p>
      <div className="flex justify-center items-center flex-col">
        <Button className="flex flex-row gap-2 w-[150px] text-sm">
          <ShoppingCartIcon className="w-4 h-4" />
          Buy now!
        </Button>
      </div>
    </div>
  );
};

export default AdvertiseCards;
