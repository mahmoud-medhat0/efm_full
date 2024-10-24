import "./Sidebar.style.css";
import { useState } from "react";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChevronDoubleUpIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  DocumentChartBarIcon,
  DocumentCheckIcon,
  DocumentPlusIcon,
  DocumentTextIcon,
  EllipsisHorizontalIcon,
  EnvelopeIcon,
  PhotoIcon,
  RectangleGroupIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  StarIcon,
  SquaresPlusIcon,
  WrenchIcon,
  TvIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/20/solid";
import Img from "../../../assets/dev.jpg";
import Logo from "../../../assets/logo.png";
import { Link } from "@inertiajs/inertia-react";
import { route } from "ziggy-js";
import { usePage } from "@inertiajs/inertia-react";

const Sidebar = () => {
  const page = usePage();
  const user = page.props.auth.client;
  const [collapsed, setCollapsed] = useState(false);
  const { current_url } = usePage().props;
  const [activeLink, setActiveLink] = useState<string>(current_url);

  const handleExpandClick = () => {
    setCollapsed(!collapsed);
    document.body.classList.toggle("collapsed", !collapsed);
  };

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
  };

  const globalLinks = [
    { href: route('client.dashboard'), icon: <TvIcon />, label: "Dashboard" },
    {
      href: route('client.dashboard.advertiser-panel'),
      icon: <ChartBarIcon />,
      label: "Advertiser Panel",
    },
    {
      href: route('client.dashboard.messages'),
      icon: <EnvelopeIcon />,
      label: "Message System",
    },
    {
      href: route('client.dashboard.membership'),
      icon: <ChevronDoubleUpIcon />,
      label: "Upgrade Account",
      isNew: true,
    },
    {
      href: route('client.dashboard.new-order'),
      icon: <ShoppingCartIcon />,
      label: "New Order",
    },
    { href: route('client.dashboard.coupons'), icon: <StarIcon />, label: "Coupon code" },
    {
      href: route('client.dashboard.deposit'),
      icon: <ArrowDownTrayIcon />,
      label: "Add funds",
    },
    {
      href: route('client.dashboard.withdraw'),
      icon: <ArrowUpTrayIcon />,
      label: "Withdraw",
    },
    { href: route('client.dashboard.banners'), icon: <PhotoIcon />, label: "Banners" },
  ];

  const settingsLinks = [
    { href: route('client.dashboard.tasks'), icon: <RectangleGroupIcon />, label: "Tasks" },
    { href: route('client.dashboard.orders'), icon: <SquaresPlusIcon />, label: "Orders" },
    { href: route('client.dashboard.convert-points'), icon: <WrenchIcon />, label: "Convert Points" },
    { href: "#dashboard", icon: <Cog6ToothIcon />, label: "Personal Settings" },
    {
      href: route('client.dashboard.2fa'),
      icon: <ShieldCheckIcon />,
      label: "Two Factor Authentication",
      isNew: false,
    },
  ];

  const referralsLinks = [
    {
      href: "#team",
      icon: <UserGroupIcon />,
      label: "Direct Referrals",
      isNew: false,
    },
    {
      href: "#team",
      icon: <ShoppingBagIcon />,
      label: "Buy Referrals",
      isNew: false,
    },
  ];

  const logsLinks = [
    {
      href: route('client.dashboard.logs.orders'),
      icon: <DocumentPlusIcon />,
      label: "Order History",
      isNew: false,
    },
    {
      href: route('client.dashboard.logs.deposit'),
      icon: <DocumentTextIcon />,
      label: "Deposit History",
      isNew: false,
    },
    {
      href: route('client.dashboard.logs.withdraw'),
      icon: <DocumentChartBarIcon />,
      label: "Withdraw History",
      isNew: false,
    },
    {
      href: route('client.dashboard.logs.login'),
      icon: <DocumentCheckIcon />,
      label: "Login History",
      isNew: false,
    },
  ];

  return (
    <nav
      className={`w-full sidebar ${collapsed ? "collapsed" : ""
        } shadow-md mt-[2px] mb-[2px] rounded-tr-md rounded-br-lg`}
    >
      <div className="sidebar-top-wrapper">
        <div className="sidebar-top">
          <Link to="/dashboard" className="logo__wrapper">
            <img src={Logo} alt="Logo" className="logo-small" />
            <span className="hide company-name">Efmhub.com</span>
          </Link>
        </div>
        <button
          className="expand-btn"
          type="button"
          onClick={handleExpandClick}
        >
          <ChevronRightIcon className="text-primary" />
        </button>
      </div>
      <div className="sidebar-links-wrapper">
        <div className="sidebar-links">
          <h2>GLOBAL</h2>
          <div className="divider"></div>
          {globalLinks.map(({ href, icon, label, isNew }, index) => (
            <ul key={index}>
              <li>
                <Link
                  href={href}
                  title={label}
                  className={`tooltip ${activeLink === href ? "active" : ""}`}
                  onClick={() => handleLinkClick(href)}
                >
                  {icon}
                  <span
                    className={`link duration-300 hide ${activeLink === href ? "active" : ""
                      }`}
                  >
                    {label}
                  </span>
                  {isNew && <div className="tag hide">New</div>}
                </Link>
              </li>
            </ul>
          ))}
          <h2>SETTINGS</h2>
          <div className="divider"></div>
          {settingsLinks.map(({ href, icon, label, isNew }, index) => (
            <ul key={index}>
              <li>
                <Link
                  href={href}
                  title={label}
                  className={`tooltip ${activeLink === href ? "active" : ""}`}
                  onClick={() => handleLinkClick(href)}
                >
                  {icon}
                  <span
                    className={`link duration-300 hide ${activeLink === href ? "active" : ""
                      }`}
                  >
                    {label}
                  </span>
                  {isNew && <div className="tag hide">New</div>}
                </Link>
              </li>
            </ul>
          ))}
          <h2>REFERRALS</h2>
          <div className="divider"></div>
          {referralsLinks.map(({ href, icon, label, isNew }, index) => (
            <ul key={index}>
              <li>
                <a
                  href={href}
                  title={label}
                  className={`tooltip ${activeLink === href ? "active" : ""}`}
                  onClick={() => handleLinkClick(href)}
                >
                  {icon}
                  <span
                    className={`link duration-300 hide ${activeLink === href ? "active" : ""
                      }`}
                  >
                    {label}
                  </span>
                  {isNew && <div className="tag hide">New</div>}
                </a>
              </li>
            </ul>
          ))}
          <h2>LOGS</h2>
          <div className="divider"></div>
          {logsLinks.map(({ href, icon, label, isNew }, index) => (
            <ul key={index}>
              <li>
                <Link
                  href={href}
                  title={label}
                  className={`tooltip ${activeLink === href ? "active" : ""}`}
                  onClick={() => handleLinkClick(href)}
                >
                  {icon}
                  <span
                    className={`link duration-300 hide ${activeLink === href ? "active" : ""
                      }`}
                  >
                    {label}
                  </span>
                  {isNew && <div className="tag hide">New</div>}
                </Link>
              </li>
            </ul>
          ))}
        </div>
      </div>
      <div className="sidebar__profile">
        <div className="avatar__wrapper">
          <img className="avatar" src={Img} alt={user.name} />
          <div className="online__status" />
        </div>
        <div className="avatar__name hide">
          <div className="user-name">{user.name}</div>
          <div className="email">{user.email}</div>
        </div>
        <EllipsisHorizontalIcon className="w-6 h-6 cursor-pointer text-primary hide" />
      </div>
    </nav>
  );
};

export default Sidebar;
