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
import hero from "../../assets/HeroImagen.png"

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="flex flex-col justify-center items-center  text-center space-y-16  bg-rounded  bg-rounded mb-15 "
      style={{paddingTop: '120px'}}
    >
      <div className="flex flex-col justify-center items-center text-center space-y-8">
        <motion.h3 className="text-7xl text-white font-medium max-sm:text-4xl mt-8">
         {window.translate("hero.welcome")}   
        <span className="mark text-gold"> {window.translate("hero.efm")} </span>
        {window.translate("hero.hub")}
        </motion.h3>
        <div className=" flex-col items-start max-sm:px-3 text-center">
      <h1 className="text-2xl text-white mx-2">{window.translate("hero.designed")} <span className="mx-1"> {window.translate("hero.and")}</span> {window.translate("hero.built")}</h1>
      
      <div className="relative overflow-hidden rounded-b-full flex items-center justify-center pt-16">
        <img
          src={hero}
          alt="logo"
          className="w-100 h-100 object-cover object-bottom "
        />
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
      
      
      <LoadingScreen />
    </section>
  );
};

export default HeroSection;
