import { Link, NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { IoLogIn, IoLogOut, IoSettingsSharp, IoInformationCircle } from "react-icons/io5";
import { MdAddChart, MdOutlineExplore, MdInsertChartOutlined, MdLiveHelp } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { LuRotate3D } from "react-icons/lu";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

// ✅ Reusable NavLink Component
const NavItem = ({ to, icon: Icon, children }) => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300
     ${isActive ? "bg-primary text-primary-content shadow-md scale-105" : "hover:bg-base-200 text-base-content/70 hover:text-base-content"}`;

  return (
    <li>
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

  // Public Links
  const publicLinks = [
    { to: "/", icon: GoHomeFill, label: "Home" },
    { to: "/browser-public-habit", icon: MdOutlineExplore, label: "Explore" },
    { to: "/faq", icon: MdLiveHelp, label: "FAQ" }, 
    { to: "/about", icon: IoInformationCircle, label: "About" },
  ];

  // Private Links (will appear inside Dashboard dropdown)
  const privateLinks = [
    { to: "/add-habit", icon: MdAddChart, label: "Add Habit" },
    { to: "/my-habit", icon: GiProgression, label: "My Habits" }, 
    { to: "/stats", icon: MdInsertChartOutlined, label: "Stats" },
  ];

  return (
    <nav
      className={`sticky top-3 z-[100] transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-base-100/80 backdrop-blur-md shadow-xl rounded-2xl py-2 mx-4"
          : "bg-transparent mx-0"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-black text-2xl tracking-tighter group transition hover:opacity-90"
        >
          <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
            <LuRotate3D className="text-primary-content animate-spin-slow" />
          </div>
          <span className="bg-gradient-to-r from-base-content to-base-content/60 bg-clip-text text-transparent">
            Habitly
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1">
          {publicLinks.map((link) => (
            <NavItem key={link.to} to={link.to} icon={link.icon}>
              {link.label}
            </NavItem>
          ))}

          {user && (
            <li className="dropdown dropdown-hover">
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-base-200 transition-all">
                <IoSettingsSharp size={18} /> Dashboard
              </button>
              <ul className="dropdown-content bg-base-100 rounded-xl shadow-2xl mt-2 p-2 min-w-[180px] flex flex-col gap-1">
                {privateLinks.map((link) => (
                  <NavItem key={link.to} to={link.to} icon={link.icon}>
                    {link.label}
                  </NavItem>
                ))}
              </ul>
            </li>
          )}
        </ul>

        {/* Right Side Tools */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle btn-sm hover:bg-primary/10 transition-colors"
          >
            {theme === "light" ? (
              <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          {/* User / Login */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar online ring ring-primary ring-offset-base-100 ring-offset-2 transition-transform active:scale-90"
              >
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || "/default-avatar.png"} alt="User Profile" referrerPolicy="no-referrer" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-2xl shadow-2xl border border-base-content/10 w-72 mt-4 p-3 z-[1]">
                <div className="relative p-4 mb-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl overflow-hidden">
                  <p className="text-[10px] uppercase font-bold text-primary tracking-widest mb-1">Authenticated</p>
                  <p className="font-bold text-base-content truncate">{user.displayName}</p>
                  <p className="text-xs opacity-60 truncate">{user.email}</p>
                  <LuRotate3D className="absolute -right-2 -bottom-2 text-4xl opacity-10" />
                </div>
                <li><Link to="/profile" className="py-2.5 flex items-center gap-2"><IoSettingsSharp size={18} /> Profile</Link></li>
                <li>
                  <button onClick={signOutUser} className="btn btn-error btn-sm w-full text-white mt-1 hover:brightness-110 flex items-center gap-2">
                    <IoLogOut size={18} /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="btn btn-primary btn-sm rounded-xl px-6 h-10 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <IoLogIn size={20} /> <span className="hidden sm:inline">Log In</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
