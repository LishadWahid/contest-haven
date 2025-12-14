import { NavLink, Outlet } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import {
    FaAd,
    FaBook,
    FaHome,
    FaList,
    FaTrophy,
    FaUser,
    FaUsers,
    FaChartPie,
    FaBars
} from "react-icons/fa";

const DashboardLayout = () => {
    const { role, isRoleLoading, isAdmin, isCreator, isUser } = useUserRole();

    // Show loading while checking roles
    if (isRoleLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    // Reusable NavItem component
    const NavItem = ({ to, icon: Icon, children, ...props }) => (
        <li>
            <NavLink
                to={to}
                {...props}
                className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium group relative overflow-hidden ${isActive
                        ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`
                }
            >
                <Icon className="text-lg relative z-10" />
                <span className="relative z-10">{children}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            </NavLink>
        </li>
    );

    const SidebarContent = () => (
        <aside className="w-72 bg-gradient-to-br from-violet-900 via-indigo-900 to-blue-900 text-white flex flex-col h-full shadow-2xl">
            {/* Sidebar Header */}
            <div className="p-8 border-b border-white/10">
                <NavLink to="/dashboard" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                        <span className="text-xl font-bold text-white">CH</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-wide text-white group-hover:text-blue-200 transition-colors">ContestHub</h1>
                        <p className="text-xs text-blue-200 uppercase tracking-wider">Dashboard</p>
                    </div>
                </NavLink>
                <div className="mt-3 px-3 py-1.5 bg-white/10 rounded-lg">
                    <p className="text-xs text-white/60">Role: <span className="text-white font-semibold">{role || 'loading...'}</span></p>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 px-4 py-6 overflow-y-auto">
                <ul className="space-y-2">
                    <NavItem to="/dashboard" icon={FaChartPie} end={true}>Overview</NavItem>
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
    );

    return (
        <div className="drawer lg:drawer-open bg-gray-50 dark:bg-gray-900 font-sans">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col">
                {/* Navbar/Top Bar */}
                <div className="w-full h-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 lg:px-8 justify-between">
                    <div className="flex items-center gap-4">
                        <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-circle lg:hidden">
                            <FaBars className="text-xl" />
                        </label>
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-white truncate">
                            Dashboard
                        </h2>
                    </div>
                    {/* Minimal Profile or Welcome Text - Can add user avatar here if needed */}
                </div>

                {/* Main Content */}
                <div className="p-4 md:p-8 lg:p-12 min-h-[calc(100vh-64px)] overflow-x-hidden">
                    <Outlet />
                </div>
            </div>

            {/* Drawer Sidebar */}
            <div className="drawer-side z-50">
                <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="min-h-full bg-base-200 text-base-content">
                    <SidebarContent />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;