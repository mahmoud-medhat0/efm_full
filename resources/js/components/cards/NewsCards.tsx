import { MegaphoneIcon } from "@heroicons/react/20/solid";

interface IProps {
  date: string;
  time: string;
  message: string;
  description: string;
  anthor_description?: string;
}

const NewsCards = ({
  date,
  time,
  message,
  description,
  anthor_description,
}: IProps) => {
  return (
    <div className="bg-background w-full p-4 rounded-lg shadow-md">
      <h3 className="text-primary flex flex-row items-center gap-3 text-xl mb-3 cursor-pointer">
        <MegaphoneIcon className="w-6 h-6 text-primary" /> {message}
      </h3>
      <h5 className="text-gray-400 text-sm mb-8">
        Published on {date} {time}
      </h5>
      <p className="text-gray-300 text-base">{description}</p>
      <p className="text-gray-300 text-base">{anthor_description}</p>
    </div>
  );
};

export default NewsCards;
