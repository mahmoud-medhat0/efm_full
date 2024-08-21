import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

interface IProps {
  msg: string;
}

const WarningAlert = ({ msg }: IProps) => {
  return (
    <div className="bg-primary border-primary border-[1px] flex flex-row items-center gap-3 p-3 rounded-lg mb-8 text-white">
      <ExclamationTriangleIcon className="w-8 h-8" /> {msg}
    </div>
  );
};

export default WarningAlert;
