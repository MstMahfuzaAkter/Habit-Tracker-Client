import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { LuRotate3D } from "react-icons/lu";
import { MdOutlineMailLock } from "react-icons/md";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content mt-10">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <button
                        onClick={() => (window.location.href = "/")}
                        className="flex items-center gap-2 text-2xl font-bold"
                    >
                        <LuRotate3D className="text-primary" />
                        Habit Tracker
                    </button>
                    <p className="text-sm mt-3 text-gray-500">
                        Build better habits, one day at a time.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
                    <p className="flex items-center gap-1 text-sm">
                        <MdOutlineMailLock />
                        mstmahfuzaker581@gmail.com
                    </p>

                    <p className="flex items-center text-sm gap-1"> <FaPhone /> +880 1234-567890</p>
                    <p className="flex items-center text-sm gap-1"> <FaLocationDot />Dhaka, Bangladesh</p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
                    <a href="/terms" className="block text-sm hover:underline">
                        Terms & Conditions
                    </a>
                    <div className="flex gap-4 mt-3 text-2xl">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">
                            <FaFacebook className="hover:text-blue-600" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                            <FaTwitter className="hover:text-sky-500" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">
                            <FaInstagram className="hover:text-pink-600" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                            <FaLinkedin className="hover:text-blue-700" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-300 text-center py-3 text-sm text-gray-500">
                © {new Date().getFullYear()} Habit Tracker — All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
