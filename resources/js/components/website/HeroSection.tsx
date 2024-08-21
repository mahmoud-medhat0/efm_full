import {
  ArrowLeftStartOnRectangleIcon,
  CheckBadgeIcon,
  // BanknotesIcon,
  // HeartIcon,
  // PresentationChartLineIcon,
  // StarIcon,
} from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import Button from "../../components/schema/Button";
import { Link } from "react-router-dom";
import LoadingScreen from "../../components/loading/screen";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="flex flex-col justify-center items-center pt-44 pb-12 text-center space-y-16 rounded-b-[120px] bg-rounded"
    >
      <div className="flex flex-col justify-center items-center text-center space-y-8">
        <motion.h3 className="text-6xl text-white font-medium max-sm:text-4xl">
          The best trading platform <br />
          in the <span className="mark">Middle East</span>
        </motion.h3>
        <h5 className="text-3xl text-[#f8f8f8] max-sm:text-2xl">
          Buy Bitcoin, Ethereum, and 150+ cryptocurrencies
        </h5>
        <div className="flex flex-col items-start">
          <div className="flex flex-row justify-center items-center gap-2 max-sm:text-base text-white text-xl">
            <CheckBadgeIcon className="w-7 h-7 text-primary" />
            <h4 className="w-full text-white text-left">
              Trade and <span className="text-primary w-fit h-fit">earn</span>{" "}
              lots of cryptocurrencies.
            </h4>
          </div>
          <div className="flex flex-row justify-center items-center gap-2 max-sm:text-base text-white text-xl">
            <CheckBadgeIcon className="w-7 h-7 text-primary" />
            <h4 className="w-full text-white text-left">
              Trust for more than{" "}
              <span className="text-primary w-fit h-fit">100,000</span> users
              worldwide.
            </h4>
          </div>
          <div className="flex flex-row justify-center items-center gap-2 max-sm:text-base text-white text-xl">
            <CheckBadgeIcon className="w-7 h-7 text-primary" />
            <h4 className="w-full text-white text-left">
              Leader in compliance{" "}
              <span className="text-primary w-fit h-fit">certifications</span> and
              user protection.
            </h4>
          </div>
        </div>
        {/* <Link to={"/register"}>
          <Button
            variant={"outline"}
            className="flex flex-row gap-2 py-2 px-6 rounded-md text-lg text-white btnHover"
          >
            Join Us
            <ArrowLeftStartOnRectangleIcon className="h-6 w-6 text-white" />
          </Button>
        </Link> */}
      </div>
      <div className="heroSection">
        {/* <StarIcon className="w-5 h-5 hn1" />
        <HeartIcon className="w-5 h-5 hn2" />
        <BanknotesIcon className="w-5 h-5 hn3" />
        <PresentationChartLineIcon className="w-5 h-5 hn4" /> */}
        <div className="bg-left" />
        {/* <div className="bg-right" /> */}
      </div>
      <LoadingScreen />
    </section>
  );
};

export default HeroSection;
