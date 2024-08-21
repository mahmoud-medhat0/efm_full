import {
  BanknotesIcon,
  ClockIcon,
  DocumentCheckIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/react";

interface IProps {
  URL: string;
  img: string;
  title: string;
  mission: string;
  money: string;
  time: string;
}

const ADSCards = ({ URL, img, title, mission, money, time }: IProps) => {
  return (
    <Link href={`view-videos/${URL}`}>
      <div className="bg-backround w-[380px] rounded-lg overflow-hidden border-2 border-primary">
        <img
          className="w-full max-h-[200px] min-h-[200px]"
          src={img}
          alt="yahia azzam"
        />
        <div className="py-4 px-2 space-y-1.5 text-left">
          <h3 className="flex flex-row justify-start items-start gap-2 text-black">
            <StarIcon className="w-6 h-6 text-primary" />
            {title}
          </h3>
          <h4 className="flex flex-row justify-start items-start gap-2 text-black">
            <DocumentCheckIcon className="w-6 h-6 text-primary" />
            {mission}
          </h4>
          <h4 className="flex flex-row justify-start items-start gap-2 text-gray-500">
            <BanknotesIcon className="w-6 h-6 text-primary" />
            {money}
          </h4>
          <h4 className="flex flex-row justify-start items-start gap-2 text-gray-500">
            <ClockIcon className="w-6 h-6 text-primary" />
            {time}
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default ADSCards;
