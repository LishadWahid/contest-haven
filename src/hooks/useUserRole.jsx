import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userRole, isPending: isRoleLoading } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data?.role || 'user'; // default to 'user' if no role
        }
    });

    return {
        role: userRole,
        isRoleLoading,
        isAdmin: userRole === 'admin',
        isCreator: userRole === 'creator',
        isUser: userRole === 'user'
    };
};

export default useUserRole;
