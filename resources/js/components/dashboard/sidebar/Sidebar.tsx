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
  CurrencyDollarIcon,
} from "@heroicons/react/20/solid";
import Img from "../../../assets/character.jpg";
import Logo from "../../../Pages/newui/photo/logo.svg";

import { Link } from "@inertiajs/inertia-react";
import { route } from "ziggy-js";
import { usePage } from "@inertiajs/inertia-react";

const Sidebar = () => {
  const page = usePage();
  const user = page.props.auth.client;
  const [collapsed, setCollapsed] = useState(true); // Ensure sidebar is hidden by default
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
    { href: route('client.dashboard.dashboard'), icon: <TvIcon />, label: "Dashboard" },
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
    {
      href: route('client.dashboard.currencies'),
      icon: <CurrencyDollarIcon />,
      label: "Currencies",
    },
  ];

  const settingsLinks = [
    { href: route('client.dashboard.tasks'), icon: <RectangleGroupIcon />, label: "Tasks" },
    { href: route('client.dashboard.orders'), icon: <SquaresPlusIcon />, label: "Orders" },
    // { href: route('client.dashboard.convert-points'), icon: <WrenchIcon />, label: "Convert Points" },
    { href: route('client.dashboard.personal-settings'), icon: <Cog6ToothIcon />, label: "Personal Settings" },
    { href: route('client.dashboard.create-ticket'), icon: <ChatBubbleBottomCenterTextIcon />, label: "Create Ticket" },
    { href: route('client.dashboard.tickets'), icon: <ChatBubbleBottomCenterTextIcon />, label: "Tickets" },  

    {
      href: route('client.dashboard.2fa'),
      icon: <ShieldCheckIcon />,
      label: "Two Factor Authentication",
      isNew: false,
    },
  ];

  const referralsLinks = [
    {
      href: route('client.dashboard.referrals'),
      icon: <UserGroupIcon />,
      label: "Direct Referrals",
      isNew: false,
    },
    // {
    //   href: "#team",
    //   icon: <ShoppingBagIcon />,
    //   label: "Buy Referrals",
    //   isNew: false,
    // },
  ];

  const logsLinks = [
    {
      href: route('client.dashboard.logs.orders'),
      icon: <DocumentTextIcon />,
      label: "Orders History",
      isNew: false,
    },
    {
      href: route('client.dashboard.logs.transaction'),
      icon: <DocumentTextIcon />,
      label: "Transaction History",
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
    <>
      {collapsed && (
        <div className="fixed top-4 left-4 p-2 text-white z-50">
        <button
          className="expand-btn fixed top-4 left-4 p-2 text-white z-50"
          style={{ pointerEvents: "auto", marginRight: "2rem", marginTop: "5rem", borderRadius: "0", backgroundColor: "transparent" }}
          type="button"
          onClick={handleExpandClick}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
        </div>
      )}

      {!collapsed && (
        <nav
          className={`sidebar block collapsed w-full shadow-md mt-[2px] mb-[2px] rounded-tr-md rounded-br-lg `}
          style={{
            position: "fixed",
            zIndex: 999,
            inset: "0px",
            pointerEvents: "auto",
            
          }}
        >
 {!collapsed && (
        <button
          className="expand-btn fixed top-4 left-4 p-2 text-white z-50"
          style={{ pointerEvents: "auto",marginLeft:"16rem"}}
          type="button"
          onClick={handleExpandClick}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      )}


          <div className="sidebar-top-wrapper">
            <div className="sidebar-top">
            <Link to={route('client.dashboard.dashboard')} className="logo__wrapper">
              <img src={Logo} alt="Logo" className="logo logo-medium" />
            </Link>

            </div>
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
      )}
    </>
  );
};

export default Sidebar;
