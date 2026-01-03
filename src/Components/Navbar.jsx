import { Link, NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { IoLogIn, IoLogOut, IoSettingsSharp, IoInformationCircle, IoMenu } from "react-icons/io5"; // Added IoMenu
import { MdAddChart, MdOutlineExplore, MdInsertChartOutlined, MdLiveHelp } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { LuRotate3D } from "react-icons/lu";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const NavItem = ({ to, icon: Icon, children, onClick }) => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300
     ${isActive ? "bg-primary text-primary-content shadow-md scale-105" : "hover:bg-base-200 text-base-content/70 hover:text-base-content"}`;

  return (
    <li onClick={onClick}>
      <NavLink to={to} className={navLinkClass}>
        {Icon && <Icon size={20} />} {children}
      </NavLink>
    </li>
  );
};

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const publicLinks = [
    { to: "/", icon: GoHomeFill, label: "Home" },
    { to: "/browser-public-habit", icon: MdOutlineExplore, label: "Explore" },
    { to: "/faq", icon: MdLiveHelp, label: "FAQ" }, 
    { to: "/about", icon: IoInformationCircle, label: "About" },
  ];

  const privateLinks = [
    { to: "/add-habit", icon: MdAddChart, label: "Add Habit" },
    { to: "/my-habit", icon: GiProgression, label: "My Habits" }, 
    { to: "/stats", icon: MdInsertChartOutlined, label: "Stats" },
  ];

  return (
    <nav
      className={`sticky top-3 z-[100] transition-all duration-500 ease-in-out px-4 ${
        scrolled
          ? "bg-base-100/80 backdrop-blur-md shadow-xl rounded-2xl py-2 mx-4"
          : "bg-transparent mx-0"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LEFT SIDE: Mobile Menu + Brand */}
        <div className="flex items-center gap-2">
          {/* Mobile Hamburger Dropdown */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <IoMenu size={24} />
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-52 border border-base-content/10">
              {publicLinks.map((link) => (
                <NavItem key={link.to} to={link.to} icon={link.icon}>{link.label}</NavItem>
              ))}
              {user && (
                <>
                  <div className="divider my-1">Dashboard</div>
                  {privateLinks.map((link) => (
                    <NavItem key={link.to} to={link.to} icon={link.icon}>{link.label}</NavItem>
                  ))}
                </>
              )}
            </ul>
          </div>

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 font-black text-xl lg:text-2xl tracking-tighter group transition hover:opacity-90">
            <div className="bg-primary p-1.5 rounded-lg shadow-lg group-hover:rotate-12 transition-transform">
              <LuRotate3D className="text-primary-content animate-spin-slow" size={18} />
            </div>
            <span className="bg-gradient-to-r from-base-content to-base-content/60 bg-clip-text text-transparent">
              Habitly
            </span>
          </Link>
        </div>

        {/* CENTER: Desktop Navigation (Hidden on Mobile) */}
        <ul className="hidden lg:flex items-center gap-1">
          {publicLinks.map((link) => (
            <NavItem key={link.to} to={link.to} icon={link.icon}>{link.label}</NavItem>
          ))}

          {user && (
            <li className="dropdown dropdown-hover">
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-base-200 transition-all">
                <IoSettingsSharp size={18} /> Dashboard
              </button>
              <ul className="dropdown-content bg-base-100 rounded-xl shadow-2xl mt-2 p-2 min-w-[180px] flex flex-col gap-1 border border-base-content/10">
                {privateLinks.map((link) => (
                  <NavItem key={link.to} to={link.to} icon={link.icon}>{link.label}</NavItem>
                ))}
              </ul>
            </li>
          )}
        </ul>

        {/* RIGHT SIDE: Tools (Theme + Profile) */}
        <div className="flex items-center gap-2 lg:gap-3">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle btn-sm">
            {theme === "light" ? (
              <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            ) : (
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            )}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar online ring ring-primary ring-offset-base-100 ring-offset-1 transition-transform active:scale-90 w-9 h-9 lg:w-10 lg:h-10">
                <div className="w-full rounded-full">
                  <img src={user.photoURL || "/default-avatar.png"} alt="User Profile" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-2xl shadow-2xl border border-base-content/10 w-64 lg:w-72 mt-4 p-3 z-[1]">
                <div className="relative p-4 mb-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl">
                  <p className="font-bold text-base-content truncate">{user.displayName}</p>
                  <p className="text-xs opacity-60 truncate">{user.email}</p>
                </div>
                <li><Link to="/profile" className="py-2.5 flex items-center gap-2"><IoSettingsSharp size={18} /> Profile</Link></li>
                <li><button onClick={signOutUser} className="btn btn-error btn-sm w-full text-white mt-1">Sign Out</button></li>
              </ul>
            </div>
          ) : (
            <Link to="/auth/login" className="btn btn-primary btn-sm rounded-xl px-4 lg:px-6 h-10 shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
              <IoLogIn size={20} /> <span className="hidden sm:inline">Log In</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;