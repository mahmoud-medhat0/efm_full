import paypal from "../../assets/partners/paypal.svg";
import bank_transfer from "../../assets/partners/bank_transfer.png";
import etisalat from "../../assets/partners/etisalat.svg";
import instapay from "../../assets/partners/instapay.png";
import orange from "../../assets/partners/orange.svg";
import vodafone from "../../assets/partners/vodafone.svg";
import we from "../../assets/partners/we.svg";
import western_union from "../../assets/partners/western_union.svg";
import telda from "../../assets/partners/telda.ico";
import googlepay from "../../assets/partners/google_pay.svg";

const PartnersSection = () => {
  return (
    <section id="partners" className="h-auto mb-32">
      <div className="text-center mb-16">
        <h2 className="text-5xl text-black mb-2">Our Partners in Success!</h2>
        <p className="text-xl text-gray-400">
          Our partners and supporters recently!
        </p>
      </div>
      <div className="flex flex-col justify-between items-center gap-3">
        <div className="flex flex-row justify-between items-center gap-x-5">
          <img
            className="w-16 h-16 grayscale hover:grayscale-0 cursor-pointer duration-300"
            src={paypal}
            alt="paypal"
          />
          <img
            className="w-16 h-16 grayscale hover:grayscale-0 cursor-pointer duration-300"
            src={bank_transfer}
            alt="bank_transfer"
          />
          <img
            className="w-16 h-16 grayscale hover:grayscale-0 cursor-pointer duration-300"
            src={etisalat}
            alt="etisalat"
          />

          <img
            className="w-16 h-16 grayscale hover:grayscale-0 cursor-pointer duration-300"
            src={orange}
            alt="orange"
          />
          <img
            className="w-16 h-16 grayscale hover:grayscale-0 cursor-pointer duration-300"
            src={we}
            alt="we"
          />
          <img
            className="w-16 h-16 grayscale hover:grayscale-0 cursor-pointer duration-300"
            src={vodafone}
            alt="vodafone"
          />
          <img
            className="w-16 h-16 grayscale hover:grayscale-0 cursor-pointer duration-300"
            src={googlepay}
            alt="react"
          />
          <img
            className="w-14 h-14 grayscale hover:grayscale-0 cursor-pointer duration-300"
            src={telda}
            alt="react"
          />
        </div>
        <div className="flex flex-row justify-between items-center gap-x-5">
          <img
            className="w-32 grayscale hover:grayscale-0 cursor-pointer duration-300"
            src={western_union}
            alt="western_union"
          />
          <div className="w-[130px] bg-background p-1 rounded-sm">
            <img
              className="w-32 grayscale hover:grayscale-0 cursor-pointer duration-300"
              src={instapay}
              alt="instapay"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
