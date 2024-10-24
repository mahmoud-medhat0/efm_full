import { BanknotesIcon } from "@heroicons/react/24/solid";
import FeaturesCards from "../../components/cards/FeaturesCards";
import {
    ArrowUpCircleIcon,
    CreditCardIcon,
    CursorArrowRippleIcon,
    RocketLaunchIcon,
} from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { slideInFromTop } from "../../utils/functions";

const FeaturesSection = () => {
    return (
        <section id="features" className="h-auto mb-32">
            <div>
                <div className="text-center mb-16">
                    <motion.h2
                        variants={slideInFromTop(1)}
                        className="text-5xl text-black mb-2"
                    >
                        Welcome to <span className="text-primary">EFM</span>hub!
                    </motion.h2>
                    <p className="text-xl text-gray-400">
                        EFMhub Start making money with simple steps.
                        <br /> Register, watch videos and other ads, and get
                        money easily
                    </p>
                </div>
                <div>
                    <div>
                        <h3 className="text-2xl text-black max-sm:text-center">
                            What you will get by{" "}
                            <span className="mark-zigzag">starting work</span>{" "}
                            with us?
                        </h3>
                    </div>
                    <div className="flex flex-row justify-center items-center flex-wrap gap-x-4 gap-y-5 mt-16 max-sm:flex-col">
                        <motion.div className="flex flex-row gap-3 max-sm:flex-col">
                            <FeaturesCards
                                className="rounded-tl-[55px] max-sm:rounded-t-[35px]"
                                description="The best and easiest way to earn money easily by watching videos and other ads"
                            >
                                <BanknotesIcon className="w-12 h-12 text-white mb-3 cursor-pointer duration-300 hoving" />
                            </FeaturesCards>
                            <FeaturesCards
                                className="rounded-tr-[55px] max-sm:rounded-md"
                                description="Earn more money by upgrading your membership and getting better features"
                            >
                                <ArrowUpCircleIcon className="w-12 h-12 text-white mb-3 cursor-pointer duration-300 hoving" />
                            </FeaturesCards>
                        </motion.div>
                        <div className="flex flex-row gap-3 max-sm:flex-col">
                            <FeaturesCards
                                className="rounded-bl-[55px] max-sm:rounded-md"
                                description="Earn more by referring your friends to register and get a percentage of profits"
                            >
                                <CursorArrowRippleIcon className="w-12 h-12 text-white mb-3 cursor-pointer duration-300 hoving" />
                            </FeaturesCards>
                            <FeaturesCards
                                className="rounded-br-[55px] max-sm:rounded-md"
                                description="Earn money by predicting the price of Bitcoin within 15 minutes and double your profit"
                            >
                                <RocketLaunchIcon className="w-12 h-12 text-white mb-3 cursor-pointer duration-300 hoving" />
                            </FeaturesCards>
                        </div>
                        <div className="flex flex-row gap-3">
                            <FeaturesCards
                                className="rounded-b-[35px]"
                                description="Withdrawing profits is very easy and will reach you within no more than 24 hours"
                            >
                                <CreditCardIcon className="w-12 h-12 text-white mb-3 cursor-pointer duration-300 hoving" />
                            </FeaturesCards>
                        </div>
                    </div>
                </div>
            </div>
            <div className="featuresSection">
                <div className="bg-left" />
            </div>
        </section>
    );
};

export default FeaturesSection;
