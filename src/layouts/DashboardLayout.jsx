import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useCreator from "../hooks/useCreator";
import {
    FaAd,
    FaBook,
    FaHome,
    FaList,
    FaTrophy,
    FaUser,
    FaUsers,
    FaChartPie
} from "react-icons/fa";

const DashboardLayout = () => {
    const [isAdmin] = useAdmin();
    const [isCreator] = useCreator();

    // Reusable NavItem component for cleaner code
    const NavItem = ({ to, icon: Icon, children }) => (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium group relative overflow-hidden ${isActive
                        ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`
                }
            >
                <Icon className="text-lg relative z-10" />
                <span className="relative z-10">{children}</span>
                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            </NavLink>
        </li>
    );

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-gradient-to-br from-violet-900 via-indigo-900 to-blue-900 text-white flex flex-col shadow-2xl sticky top-0 h-screen overflow-y-auto z-50">
                {/* Sidebar Header */}
                <div className="p-8 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
                            <span className="text-xl font-bold text-white">CH</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-wide">ContestHub</h1>
                            <p className="text-xs text-blue-200 uppercase tracking-wider">Dashboard</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className="flex-1 px-4 py-6">
                    <ul className="space-y-2">
                        {
                            isAdmin ? (
                                <>
                                    <div className="px-4 pb-2 pt-2 text-xs font-bold text-white/40 uppercase tracking-widest">Admin Control</div>
                                    <NavItem to="/dashboard/manage-users" icon={FaUsers}>Manage Users</NavItem>
                                    <NavItem to="/dashboard/manage-contests" icon={FaBook}>Manage Contests</NavItem>
                                </>
                            ) : isCreator ? (
                                <>
                                    <div className="px-4 pb-2 pt-2 text-xs font-bold text-white/40 uppercase tracking-widest">Creator Studio</div>
                                    <NavItem to="/dashboard/add-contest" icon={FaAd}>Add Contest</NavItem>
                                    <NavItem to="/dashboard/my-contests" icon={FaList}>My Contests</NavItem>
                                </>
                            ) : (
                                <>
                                    <div className="px-4 pb-2 pt-2 text-xs font-bold text-white/40 uppercase tracking-widest">Participant Zone</div>
                                    <NavItem to="/dashboard/participated" icon={FaList}>Participated</NavItem>
                                    <NavItem to="/dashboard/winnings" icon={FaTrophy}>My Winnings</NavItem>
                                    <NavItem to="/dashboard/profile" icon={FaUser}>My Profile</NavItem>
                                </>
                            )
                        }

                        {/* Shared Section */}
                        <div className="my-6 border-t border-white/10"></div>

                        <div className="px-4 pb-2 text-xs font-bold text-white/40 uppercase tracking-widest">Menu</div>
                        <NavItem to="/" icon={FaHome}>Home</NavItem>
                    </ul>
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-white/10 bg-black/20">
                    <div className="flex items-center justify-center gap-2 text-xs text-white/40">
                        <span>© 2024 ContestHub</span>
                    </div>
                </div>
            </aside>

            {/* Dashboard Content Area */}
            <main className="flex-1 overflow-x-hidden relative">
                {/* Top decorative bar for mobile/desktop continuity visual */}
                <div className="h-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-8 md:px-12">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Welcome Back
                    </h2>
                    {/* Placeholder for user avatar or top nav items could go here */}
                </div>

                <div className="p-8 md:p-12">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;