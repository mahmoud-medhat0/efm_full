import { useState } from "react";
import "./Navbar.css";
import logo from "../../../photo/logo.svg";
import arrowLogo from "../../../photo/arrow-up-right.svg";
import { Link, usePage } from "@inertiajs/inertia-react";
import { route } from "ziggy-js";
const Navbar = () => {
  const { props } = usePage();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const {client} = props.auth;
  return (
    <header className="headerss">
      <img src={logo} alt="logo" className="logoss" />
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`nav ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link href={route("client.home")}>Home</Link>
          </li>
          <li>
            <Link href={route("client.home")+"#about"}>About Us</Link>
          </li>
          <li>
            <Link href={route("client.referral-contest")}>Referral Contest</Link>
          </li>
          <li>
            <Link href={route("client.home")+"#membership"}>Membership</Link>
          </li>
          <li>
            <Link href={route("client.home")+"#offers"}>Offers</Link>
          </li>
        </ul>
        <div className="mobile-auth-buttons">
          {!client ? (
            <>
        <Link href={route("client.register")}>
          <p className="flex align-items-center ">
            Join us{" "}
            <img className="text-white" src={arrowLogo} alt="" style={{ width: "24px", height: "24px", color:"white"}} />
            </p>{" "}
          </Link>
          <Link href={route("client.login")}>Sign In</Link>
          </>
          ) : (
            <Link href={route("client.dashboard")}>Dashboard</Link>
          )}
        </div>
      </nav>
      <div className="auth-buttons">
        {!client ? (
          <>
          <Link href={route("client.register")}>
          <p className="flex align-items-center ">
            Join us{" "}
            <img className="text-white" src={arrowLogo} alt="" style={{ width: "24px", height: "24px", color:"white"}} />
            </p>{" "}
          </Link>
          <Link href={route("client.login")}>Sign In</Link>
          </>
        ) : (
          <>
          <Link href={route("client.dashboard")}>Dashboard</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
