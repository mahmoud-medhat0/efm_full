import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cryptoIcon from "../../assets/icons/crypto.png";
import solanaIcon from "../../assets/icons/solana.png";
import tetherIcon from "../../assets/icons/tether.png";
import ethereumIcon from "../../assets/icons/ethereum.png";
import crypto2Icon from "../../assets/icons/cryptocurrency.png";
import crypto3Icon from "../../assets/icons/cryptocurrency2.png";
// import {
//   CreditCardIcon,
//   FireIcon,
//   HeartIcon,
//   RocketLaunchIcon,
// } from "@heroicons/react/20/solid";

const PaymentsSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
  };

  return (
    <section id="payments" className="h-auto mb-32">
      <div className="text-center mb-16">
        <h2 className="text-5xl text-black mb-2">We process payments via!</h2>
        <p className="text-xl text-gray-400">
          The cryptocurrencies we pay with here on our platform.
        </p>
      </div>
      <Slider className="flex items-center max-sm:gap-3" {...settings}>
        <div>
          <img
            className="w-32 h-32 max-sm:w-20 max-sm:h-20"
            src={cryptoIcon}
            alt="cryptoIcon"
          />
        </div>
        <div>
          <img
            className="w-32 h-32 max-sm:w-20 max-sm:h-20"
            src={crypto2Icon}
            alt="cryptoIcon"
          />
        </div>
        <div>
          <img
            className="w-32 h-32 max-sm:w-20 max-sm:h-20"
            src={crypto3Icon}
            alt="cryptoIcon"
          />
        </div>
        <div>
          <img
            className="w-32 h-32 max-sm:w-20 max-sm:h-20"
            src={ethereumIcon}
            alt="ethereumIcon"
          />
        </div>
        <div>
          <img
            className="w-32 h-32 max-sm:w-20 max-sm:h-20"
            src={solanaIcon}
            alt="solanaIcon"
          />
        </div>
        <div>
          <img
            className="w-32 h-32 max-sm:w-20 max-sm:h-20"
            src={tetherIcon}
            alt="tetherIcon"
          />
        </div>
      </Slider>
      <div className="paymentSection">
        {/* <CreditCardIcon className="w-5 h-5 pn1" />
        <HeartIcon className="w-5 h-5 pn2" />
        <RocketLaunchIcon className="w-5 h-5 pn3" />
        <FireIcon className="w-5 h-5 pn4" /> */}
      </div>
    </section>
  );
};

export default PaymentsSection;
