import { BanknotesIcon } from "@heroicons/react/24/solid";
import {
  ArrowUpCircleIcon,
  CreditCardIcon,
  CursorArrowRippleIcon,
  RocketLaunchIcon,
} from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { slideInFromTop } from "../../utils/functions";
import ReferralCards from "../../components/cards/ReferralCards";

const ReferralSection = () => {
  return (
    <section id="referral" className="h-auto mb-32">
      <div>
        <div className="text-center mb-16">
          <motion.h2
            variants={slideInFromTop(1)}
            className="text-5xl text-black mb-2"
          >
            Referral on <span className="text-primary">EFM</span>hub!
          </motion.h2>
          <p className="text-xl text-gray-400">
            Advertise with us and Promote your brand and get great results.
          </p>
        </div>
        <div>
          <div>
            <h3 className="text-2xl text-black">
              What you will get by <span className="mark-zigzag">referral</span>{" "}
              with us?
            </h3>
          </div>
          <div className="flex flex-row justify-center items-center flex-wrap gap-x-4 gap-y-5 mt-16 max-sm:flex-col">
            <motion.div className="flex flex-row gap-3 max-sm:flex-col">
              <ReferralCards
                className="rounded-tl-[55px] max-sm:rounded-t-[35px]"
                description="The best and easiest way to earn money easily by watching videos and other ads"
              >
                <BanknotesIcon className="w-12 h-12 text-white mb-3 cursor-pointer duration-300 hoving" />
              </ReferralCards>
              <ReferralCards
                className="rounded-tr-[55px] max-sm:rounded-md"
                description="Earn more money by upgrading your membership and getting better features"
              >
                <ArrowUpCircleIcon className="w-12 h-12 text-white mb-3 cursor-pointer duration-300 hoving" />
              </ReferralCards>
            </motion.div>
            <div className="flex flex-row gap-3 max-sm:flex-col">
              <ReferralCards
                className="rounded-bl-[55px] max-sm:rounded-md"
                description="Earn more by referring your friends to register and get a percentage of profits"
              >
                <CursorArrowRippleIcon className="w-12 h-12 text-white mb-3 cursor-pointer duration-300 hoving" />
              </ReferralCards>
              <ReferralCards
                className="rounded-br-[55px] max-sm:rounded-md"
                description="Earn money by predicting the price of Bitcoin within 15 minutes and double your profit"
              >
                <RocketLaunchIcon className="w-12 h-12 text-white mb-3 cursor-pointer duration-300 hoving" />
              </ReferralCards>
            </div>
            <div className="flex flex-row gap-3">
              <ReferralCards
                className="rounded-b-[35px]"
                description="Withdrawing profits is very easy and will reach you within no more than 24 hours"
              >
                <CreditCardIcon className="w-12 h-12 text-white mb-3 cursor-pointer duration-300 hoving" />
              </ReferralCards>
            </div>
          </div>
        </div>
      </div>
      <div className="referralsection">
        <div className="bg-left" />
      </div>
    </section>
  );
};

export default ReferralSection;
