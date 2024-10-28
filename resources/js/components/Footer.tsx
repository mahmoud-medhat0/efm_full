import { Link } from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import logo from "../assets/logo.png";
import discord from "../assets/media/discord.svg";
import facebook from "../assets/media/facebook.svg";
import twitter from "../assets/media/twitter.svg";
import instagram from "../assets/media/instagram.svg";
import linkedin from "../assets/media/linkedin.svg";
import reddit from "../assets/media/reddit.svg";
import telegram from "../assets/media/telegram.svg";
import threads from "../assets/media/threads.svg";

const Footer = () => {
  return (
    <footer className="border-t-[1px] border-[#323C52] container-light">
      <div className="container">
        <div className="flex flex-row items-center mb-16 pt-16 max-sm:flex-col max-sm:gap-2">
          <Link
            to={"/"}
            className="flex flex-row items-center text-black text-lg gap-1"
          >
            <img className="w-10 h-10" src={logo} alt="logo" />
            <span>
              <span className="text-black text-center">EFM</span>
              hub.com
            </span>
          </Link>

          <div className="h-[2px] mx-5 bg-[#323C52] flex-1"></div>
          <div className="grid grid-cols-8 max-sm:grid-cols-4 gap-5">
            <Link
              to={"/"}
              disabled={true}
              className="rounded-full border-[#323C52] border-[1px] hover:border-primary duration-300"
            >
              <img src={discord} alt="" />
            </Link>
            <Link
              to={"/"}
              disabled={true}
              className="rounded-full border-[#323C52] border-[1px] hover:border-primary duration-300"
            >
              <img src={facebook} alt="" />
            </Link>
            <Link
              to={"/"}
              disabled={true}
              className="rounded-full border-[#323C52] border-[1px] hover:border-primary duration-300"
            >
              <img src={instagram} alt="" />
            </Link>
            <Link
              to={"/"}
              className="rounded-full border-[#323C52] border-[1px] hover:border-primary duration-300"
            >
              <img src={linkedin} alt="" />
            </Link>
            <Link
              to={"/"}
              className="rounded-full border-[#323C52] border-[1px] hover:border-primary duration-300"
            >
              <img src={reddit} alt="" />
            </Link>
            <Link
              to={"/"}
              className="rounded-full border-[#323C52] border-[1px] hover:border-primary duration-300"
            >
              <img src={telegram} alt="" />
            </Link>
            <Link
              to={"/"}
              className="rounded-full border-[#323C52] border-[1px] hover:border-primary duration-300"
            >
              <img src={threads} alt="" />
            </Link>
            <Link
              to={"/"}
              className="rounded-full border-[#323C52] border-[1px] hover:border-primary duration-300"
            >
              <img src={twitter} alt="" />
            </Link>
          </div>
        </div>
        {/* <div className="w-full grid grid-cols-4 max-sm:grid-cols-2 gap-5 text-black text-lg mb-20">
          <div className="flex flex-col gap-y-4">
            <Link
              to={"/"}
              className="border-l-[1px] pl-2 hover:border-primary hover:text-primary/80 duration-150"
            >
              App
            </Link>
            <Link
              to={"/"}
              className="border-l-[1px] pl-2 hover:border-primary hover:text-primary/80 duration-150"
            >
              VISA CARD
            </Link>
            <Link
              to={"/"}
              className="border-l-[1px] pl-2 hover:border-primary hover:text-primary/80 duration-150"
            >
              DEFI WALLET
            </Link>
            <Link
              to={"/"}
              className="border-l-[1px] pl-2 hover:border-primary hover:text-primary/80 duration-150"
            >
              NFT
            </Link>
          </div>
          <div className="space-y-3">
            <h4>Features</h4>
            <ul className="text-sm">
              <li>
                <Link className="hover:text-primary" to={"/"}>
                  Buy and Sell
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" to={"/"}>
                  On-chain Staking
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" to={"/"}>
                  Supercharger
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" to={"/"}>
                  Trading Arena
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4>Prices</h4>
            <ul className="text-sm">
              <li>
                <Link className="hover:text-primary" to={"/"}>
                  Crypto Prices
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" to={"/"}>
                  Bitcoin Price
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" to={"/"}>
                  Ethereum Price
                </Link>
              </li>
            </ul>
            <h4>News</h4>
            <ul className="text-sm">
              <li>
                <Link className="hover:text-primary" to={"/"}>
                  What's Trending
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" to={"/"}>
                  Market Updates
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" to={"/"}>
                  Company News
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" to={"/"}>
                  Events
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4>Company</h4>
            <ul className="text-sm">
              <li>
                <Link className="hover:text-primary" to={"/"}>
                  Partners
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" to={"/"}>
                  Proof of Reserves
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" to={"/"}>
                  Careers
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" to={"/"}>
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div> */}
        <div className="border-t-[1px] border-[#323C52]" />
        <div className="flex flex-row justify-between pt-2 text-sm text-gray-500">
          <h5>
            Copyright © 2024 <span className="text-primary">EFM</span>hub.com. All rights
            reserved.
          </h5>
          <p>
            <Link className="hover:text-primary" to={"/"}>
              Privacy Notice
            </Link>{" "}
            |{" "}
            <Link className="hover:text-primary" to={"/"}>
              Status
            </Link>{" "}
            |{" "}
            <Link className="hover:text-primary" to={"/"}>
              Cookie Preferences
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
