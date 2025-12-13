import useUserRole from "../../hooks/useUserRole";
import AdminDashboard from "./Admin/AdminDashboard";
import CreatorDashboard from "./Creator/CreatorDashboard";
import UserDashboard from "./User/UserDashboard";

const DashboardHome = () => {
    const { isAdmin, isCreator, isRoleLoading } = useUserRole();

    if (isRoleLoading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    if (isAdmin) {
        return <AdminDashboard />;
    }

    if (isCreator) {
        return <CreatorDashboard />;
    }

    return <UserDashboard />;
};

export default DashboardHome;
