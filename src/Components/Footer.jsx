import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { LuRotate3D } from "react-icons/lu";
import { MdOutlineMailLock } from "react-icons/md";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white mt-20 pt-16 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 pb-16">
        
        {/* Brand Section */}
        <div className="md:col-span-1 space-y-6">
          <Link to="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter">
            <LuRotate3D className="text-blue-500" />
            Habit Tracker
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed">
            Architecting a better version of yourself through daily discipline and data-driven progress.
          </p>
          <div className="flex gap-4 text-xl">
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-blue-600 transition-all duration-300">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-sky-500 transition-all duration-300">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-pink-600 transition-all duration-300">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-blue-700 transition-all duration-300">
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-500 mb-6">Contact</h3>
          <ul className="space-y-4 text-slate-400">
            <li className="flex items-center gap-3 text-sm hover:text-white transition-colors cursor-pointer">
              <MdOutlineMailLock className="text-blue-500" />
              mstmahfuzaker581@gmail.com
            </li>
            <li className="flex items-center gap-3 text-sm hover:text-white transition-colors cursor-pointer">
              <FaPhone className="text-blue-500" />
              +880 1234-567890
            </li>
            <li className="flex items-center gap-3 text-sm hover:text-white transition-colors cursor-pointer">
              <FaLocationDot className="text-blue-500" />
              Dhaka, Bangladesh
            </li>
          </ul>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-500 mb-6">Quick Links</h3>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><Link to="/my-habits" className="hover:text-white hover:pl-2 transition-all">My Dashboard</Link></li>
            <li><Link to="/browser-public-habit" className="hover:text-white hover:pl-2 transition-all">Global Habits</Link></li>
            <li><Link to="/add-habit" className="hover:text-white hover:pl-2 transition-all">Create Habit</Link></li>
            <li><Link to="/terms" className="hover:text-white hover:pl-2 transition-all">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Newsletter Section (Professional Touch) */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-500 mb-6">Newsletter</h3>
          <p className="text-xs text-slate-400 mb-4">Get weekly productivity tips directly.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email" 
              className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-blue-500 w-full"
            />
            <button className="bg-blue-600 p-2 px-4 rounded-full text-xs font-bold hover:bg-blue-700 transition-all">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="border-t border-white/5 py-8 text-center bg-black/50">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">
          © {new Date().getFullYear()} Habit Tracker — Engineered for Consistency
        </p>
      </div>
    </footer>
  );
};

export default Footer;