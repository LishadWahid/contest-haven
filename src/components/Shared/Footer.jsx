import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import logo from '../../assets/images/logo.jpg'

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 mt-20 border-t">
            <div className="max-w-7xl bg-white dark:bg-gray-800 mx-auto px-6 py-10">
                <div className="flex flex-col items-center gap-4 text-center">

                    {/* Logo + Website Name */}
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src={logo}
                            alt="ContestHub Logo"
                            className="w-12 h-12 rounded-md"
                        />
                        <span className="text-2xl font-bold text-black dark:text-white">
                            ContestHub
                        </span>
                    </Link>

                    {/* Social Links */}
                    <div className="flex gap-6 text-2xl mt-3">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:scale-110 transition"
                        >
                            <FaFacebook />
                        </a>

                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:scale-110 transition"
                        >
                            <FaLinkedin />
                        </a>
                    </div>

                    {/* Copyright */}
                    <p className="text-black dark:text-gray-300 mt-4">
                        © 2025 <span className="font-semibold">ContestHub</span>. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
