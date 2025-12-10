import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useCreator from "../hooks/useCreator";
import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaTrophy, FaUser, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";

const DashboardLayout = () => {
    const [isAdmin] = useAdmin();
    const [isCreator] = useCreator(); // Assume isCreator logic exists
    // Verify useCreator hook logic: if logic is similar to useAdmin.

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li><NavLink to="/dashboard/manage-users"><FaUsers></FaUsers> Manage Users</NavLink></li>
                            <li><NavLink to="/dashboard/manage-contests"><FaBook></FaBook> Manage Contests</NavLink></li>
                        </> : isCreator ? <>
                            <li><NavLink to="/dashboard/add-contest"><FaAd></FaAd> Add Contest</NavLink></li>
                            <li><NavLink to="/dashboard/my-contests"><FaList></FaList> My Created Contests</NavLink></li>
                            {/* <li><NavLink to="/dashboard/submitted-tasks"><FaBook></FaBook> Submitted Tasks</NavLink></li> */}
                            {/* Typically submitted tasks are viewed PER contest in "My Created Contests" -> "See Submissions" */}
                        </> : <>
                            <li><NavLink to="/dashboard/participated"><FaList></FaList> My Participated Contests</NavLink></li>
                            <li><NavLink to="/dashboard/winnings"><FaTrophy></FaTrophy> My Winning Contests</NavLink></li>
                            <li><NavLink to="/dashboard/profile"><FaUser></FaUser> My Profile</NavLink></li>
                        </>
                    }
                    {/* Shared nav links */}
                    <div className="divider"></div>
                    <li><NavLink to="/"><FaHome></FaHome> Home</NavLink></li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;