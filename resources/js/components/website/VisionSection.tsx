import CountUp from "react-countup";
import logo from "../../assets/logo.png";
import Button from "../../components/schema/Button";
import {
  // ArrowTrendingUpIcon,
  // BoltIcon,
  // BuildingLibraryIcon,
  // PaperAirplaneIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
// import { Link } from "react-router-dom";

const VisionSection = () => {
  return (
    <section id="vision" className="h-auto w-full mb-32">
      <div className="text-center mb-16">
        <h2 className="text-5xl text-black mb-2">Our vision for the future!</h2>
        <p className="text-xl text-gray-400">
          Our long-term goals and planning is our foundation.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-16 mb-16">
        <img
          className="w-64 h-64 rounded-full duration-300 logoLight"
          src={logo}
          alt="logo"
        />
        <div className="w-full flex flex-row justify-between items-center px-24 max-sm:flex-col max-sm:gap-5">
          <h3 className="text-black text-3xl text-center">
            Founded in <br />{" "}
            <span className="text-primary">
              <CountUp duration={3} end={2022} />
            </span>
          </h3>
          <h3 className="text-black text-3xl text-center">
            Users <br />{" "}
            <span className="text-primary">
              <CountUp duration={5} end={100000} />
            </span>
          </h3>
        </div>
      </div>
      {/* <Link
        to={"/about-us"}
        className="w-fit mx-auto flex justify-center items-center"
      >
        <Button
          variant={"default"}
          className="flex flex-row gap-2 py-2 px-6 rounded-md text-lg text-black bg-primary hover:bg-primary/80"
        >
          About Us
          <UserGroupIcon className="h-6 w-6 text-white" />
        </Button>
      </Link> */}
      <div className="visionSection">
        {/* <ArrowTrendingUpIcon className="w-5 h-5 vn1" />
        <BoltIcon className="w-5 h-5 vn2" />
        <BuildingLibraryIcon className="w-5 h-5 vn3" />
        <PaperAirplaneIcon className="w-5 h-5 vn4" /> */}
      </div>
    </section>
  );
};

export default VisionSection;
