import {
  Cog8ToothIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { MegaphoneIcon, ShoppingCartIcon } from "@heroicons/react/20/solid";
import AdvertiseCards from "../../components/cards/AdvertCards";

const AdvertiseSection = () => {
  return (
    <section id="adverise" className="h-auto mb-32">
      <div>
        <div className="text-center mb-16">
          <h2 className="text-5xl text-black mb-2">
            Advertise on <span className="text-primary mark-zigzag-dark">EFM</span>hub!
          </h2>
          <p className="text-xl text-gray-400">
            Advertise with us and Promote your brand and get great results.
          </p>
        </div>
        <div>
          <div>
            <h3 className="text-2xl text-black max-sm:text-center">
              What will you get to{" "}
              <span className="mark-zigzag">start advertising</span> with us?
            </h3>
          </div>
          <div className="flex flex-row justify-center items-center flex-wrap gap-x-4 gap-y-5 mt-16">
            <div className="flex flex-row gap-3 max-sm:flex-col">
              <AdvertiseCards
                className="rounded-tl-[55px] max-sm:rounded-t-[35px]"
                description="You can reach potential customers and increase awareness of your brand."
              >
                <UsersIcon className="w-12 h-12 text-white mb-3 cursor-pointer duration-300 hoving" />
              </AdvertiseCards>
              <AdvertiseCards
                className="rounded-tr-[55px] max-sm:rounded-md"
                description="Get hundreds of thousands of visits for your videos and spread faster and become famous."
              >
                <MegaphoneIcon className="w-12 h-12 text-white mb-3 cursor-pointer duration-300 hoving" />
              </AdvertiseCards>
            </div>
            <div className="flex flex-row gap-3 max-sm:flex-col">
              <AdvertiseCards
                className="rounded-bl-[55px] max-sm:rounded-md"
                description="You can easily get hundreds of thousands of targeted visits to your website or products."
              >
                <ShoppingCartIcon className="w-12 h-12 text-white mb-3 cursor-pointer duration-300 hoving" />
              </AdvertiseCards>
              <AdvertiseCards
                className="rounded-br-[55px] max-sm:rounded-md"
                description="You can control everything, target, and see all the details of your advertising campaign."
              >
                <Cog8ToothIcon className="w-12 h-12 text-white mb-3 cursor-pointer duration-300 hoving" />
              </AdvertiseCards>
            </div>
            <div className="flex flex-row gap-3 max-sm:flex-col">
              <AdvertiseCards
                className="rounded-b-[35px]"
                description="We have the strongest system to protect you from fake views and visits."
              >
                <ShieldCheckIcon className="w-12 h-12 text-white mb-3 cursor-pointer duration-300 hoving" />
              </AdvertiseCards>
            </div>
          </div>
        </div>
      </div>
      <div className="advertiseSection">
        {/* <div className="bg-right" /> */}
      </div>
    </section>
  );
};

export default AdvertiseSection;
