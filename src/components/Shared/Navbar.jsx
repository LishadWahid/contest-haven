
import { AiOutlineMenu, AiOutlineBgColors } from "react-icons/ai";
import { FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import Container from "./Container";
import useAuth from "../hooks/useAuth";
import trophyImg from "../../assets/images/Trophy.png"

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);

        // Sync Tailwind 'dark' class with DaisyUI theme
        if (localTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    return (
        <div className="fixed w-full bg-white dark:bg-gray-900 dark:text-white text-black z-50 shadow-sm transition-colors duration-300">
            <div className="py-4">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">

                        {/* ---------- LOGO + WEBSITE NAME ---------- */}
                        <Link to="/" className="flex items-center gap-2">
                            <img
                                src={trophyImg}
                                alt="logo"
                                width="45"
                                height="45"
                                className="rounded-md"
                            />
                            <span className="font-bold text-xl hidden md:block text-primary dark:text-blue-400">
                                ContestHub
                            </span>
                        </Link>

                        {/* ---------- NAV MENU (Large screen only) ---------- */}
                        <div className="hidden md:flex items-center gap-6 font-semibold">
                            <Link to="/" className="hover:text-primary transition">Home</Link>
                            <Link to="/all-contests" className="hover:text-primary transition">All Contests</Link>
                            <Link to="/extra" className="hover:text-primary transition">Extra Section</Link>
                        </div>

                        {/* ---------- RIGHT SIDE (Theme Toggle + Dropdown) ---------- */}
                        <div className="flex items-center gap-4">

                            {/* Theme Toggle Checkbox */}
                            <label className="swap swap-rotate">
                                {/* this hidden checkbox controls the state */}
                                <input
                                    type="checkbox"
                                    onChange={handleToggle}
                                    checked={theme === "dark"}
                                />

                                {/* sun icon */}
                                <FaSun className="swap-on fill-current w-6 h-6 text-yellow-500" />

                                {/* moon icon */}
                                <FaMoon className="swap-off fill-current w-6 h-6 text-blue-900" />
                            </label>

                            {/* ---------- DROPDOWN MENU ---------- */}
                            <div className="relative">
                                <div className="flex flex-row items-center gap-3">

                                    {/* Dropdown Button */}
                                    <div
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="p-4 md:py-1 md:px-2 border border-neutral-200 dark:border-gray-700 flex flex-row 
                                        items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition bg-white dark:bg-gray-800"
                                    >
                                        <AiOutlineMenu className="dark:text-white" />
                                        <div className="hidden md:block">
                                            {/* Avatar */}
                                            {user && user.photoURL ? (
                                                <img
                                                    className="rounded-full"
                                                    src={user.photoURL}
                                                    alt="profile"
                                                    width="30"
                                                    height="30"
                                                />
                                            ) : (
                                                <div className="w-[30px] h-[30px] rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* ---------- DROPDOWN LIST ---------- */}
                                {isOpen && (
                                    <div
                                        className="absolute rounded-xl shadow-md w-[55vw] md:w-[12vw] bg-white dark:bg-gray-800 dark:text-white
                                        overflow-hidden right-0 top-12 text-sm z-50 ring-1 ring-black ring-opacity-5"
                                    >
                                        <div className="flex flex-col cursor-pointer">

                                            {/* Mobile Nav Menu */}
                                            <div className="md:hidden">
                                                <Link
                                                    to="/"
                                                    className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 font-semibold block"
                                                >
                                                    Home
                                                </Link>
                                                <Link
                                                    to="/all-contests"
                                                    className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 font-semibold block"
                                                >
                                                    All Contests
                                                </Link>
                                                <Link
                                                    to="/extra"
                                                    className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 font-semibold block"
                                                >
                                                    Extra Section
                                                </Link>
                                            </div>

                                            {/* If User Logged In */}
                                            {user ? (
                                                <>
                                                    <div className="px-4 py-2 text-center font-semibold border-b dark:border-gray-700">
                                                        {user.displayName}
                                                    </div>

                                                    <Link
                                                        to="/dashboard"
                                                        className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold block"
                                                    >
                                                        Dashboard
                                                    </Link>
                                                    <div
                                                        onClick={logOut}
                                                        className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold cursor-pointer"
                                                    >
                                                        Logout
                                                    </div>
                                                </>
                                            ) : (
                                                /* If Not Logged In */
                                                <>
                                                    <Link
                                                        to="/login"
                                                        className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold block"
                                                    >
                                                        Login
                                                    </Link>
                                                    <Link
                                                        to="/signup"
                                                        className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold block"
                                                    >
                                                        Sign Up
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;
