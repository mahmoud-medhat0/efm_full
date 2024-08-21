import { ReactNode } from "react";

interface IProps {
  className?: string;
  description: string;
  children: ReactNode;
}

const FeaturesCards = ({ className, description, children }: IProps) => {
  return (
    <div
      className={`features-cards rounded-md p-3 flex flex-col items-center shadow-md ${className}`}
    >
      {children}
      <p className="min-w-[500px] max-w-[500px] text-white text-center max-sm:min-w-[300px] max-sm:max-w-[500px]">
        {description}
      </p>
    </div>
  );
};

export default FeaturesCards;
