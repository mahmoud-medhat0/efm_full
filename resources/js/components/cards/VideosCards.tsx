import youtube from "../../assets/media/youtube.png";
import { BanknotesIcon, ClockIcon } from "@heroicons/react/20/solid";

interface IProps {
  URL?: string;
  img: string;
  title: string;
  money: string;
  time: string;
  onClick?: () => void;
}

const VideosCards = ({ img, title, money, time, onClick }: IProps) => {
  return (
    <div
      className="bg-background w-[380px] rounded-lg overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img className="w-full" src={img} alt="yahia azzam" />
      <div className="py-4 px-2 space-y-1.5">
        <h3
          className="text-right flex flex-row justify-end items-start gap-2 text-white"
          title={title}
        >
          {title} <img className="w-6 h-6" src={youtube} alt="youtube-icon" />
        </h3>
        <h4
          className="flex flex-row justify-end items-start gap-2 text-gray-500"
          title={money}
        >
          {money}
          <BanknotesIcon className="w-6 h-6 text-primary" />
        </h4>
        <h4
          className="flex flex-row justify-end items-start gap-2 text-gray-500"
          title={time}
        >
          {time}
          <ClockIcon className="w-6 h-6 text-primary" />
        </h4>
      </div>
    </div>
  );
};

export default VideosCards;
