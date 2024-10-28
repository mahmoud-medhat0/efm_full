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
import { usePage } from "@inertiajs/inertia-react";
const PaymentsSection = () => {
  const { gateways } = usePage().props;
  const { app_url } = usePage().props;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <section style={{backgroundColor:"#2d3a4a"}}  className='w-full container-dark text-gold pt-5'>
      <div className="text-center mb-16 ">
        <h2 className="text-5xl text-gold mb-5" style={{ fontSize: '4em'}}>We process <span className="mark-zigzag ">payments</span><br /> via!</h2>

      </div>
      <Slider className="flex items-center max-sm:gap-3 pb-10" {...settings}>
        {gateways.map((gateway) => (
          <div>
            <img
            className="w-32 h-32 max-sm:w-20 max-sm:h-20"
              src={`${app_url}/storage/${gateway.logo}`}
            alt={gateway.name}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default PaymentsSection;
