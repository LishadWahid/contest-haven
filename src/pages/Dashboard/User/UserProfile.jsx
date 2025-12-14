import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { useQuery } from '@tanstack/react-query';

const UserProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm();

    // Fetch detailed user info from DB
    const { data: mongoUser = {}, refetch: refetchUser } = useQuery({
        queryKey: ['mongoUser', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    // Fetch payments (Participations)
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    });

    // Fetch wins
    const { data: winningContests = [] } = useQuery({
        queryKey: ['winningContests', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/won/${user.email}`);
            return res.data;
        }
    });

    const wins = winningContests.length;
    const participations = payments.length;
    const losses = Math.max(0, participations - wins);

    const data = [
        { name: 'Wins', value: wins },
        { name: 'Not Won', value: losses },
    ];
    const COLORS = ['#10B981', '#F59E0B']; // Green for wins, Orange for others

    const onSubmit = async (formData) => {
        try {
            // 1. Update Firebase
            await updateUserProfile(formData.name, formData.photoURL);

            // 2. Update Database
            const res = await axiosSecure.patch(`/users/${mongoUser._id}`, {
                name: formData.name,
                photo: formData.photoURL,
                address: formData.address
            });

            if (res.data.modifiedCount > 0) {
                toast.success("Profile Updated Successfully");
                refetchUser();
            } else {
                toast.success("Profile Updated (No DB changes)");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile");
        }
    }

    return (
        <div className="space-y-6">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 dark:from-pink-700 dark:via-purple-700 dark:to-indigo-700 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden border-2 border-white/50 shadow-lg">
                        <img
                            src={mongoUser.photo || user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-1">My Profile</h2>
                        <p className="text-white/90 text-lg">Manage your account and view statistics</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Edit Form */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 p-6">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            Edit Profile
                        </h3>
                    </div>

                    {/* Form Body */}
                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label className="block text-base font-semibold text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>
                            <input
                                type="text"
                                defaultValue={mongoUser.name || user?.displayName}
                                {...register("name")}
                                className="w-full px-4 py-3 text-base rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 transition-all outline-none"
                                placeholder="Enter your full name"
                            />
                        </div>

                        {/* Photo URL Field */}
                        <div className="space-y-2">
                            <label className="block text-base font-semibold text-gray-700 dark:text-gray-300">
                                Photo URL
                            </label>
                            <input
                                type="text"
                                defaultValue={mongoUser.photo || user?.photoURL}
                                {...register("photoURL")}
                                className="w-full px-4 py-3 text-base rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 transition-all outline-none"
                                placeholder="https://example.com/photo.jpg"
                            />
                        </div>

                        {/* Address Field */}
                        <div className="space-y-2">
                            <label className="block text-base font-semibold text-gray-700 dark:text-gray-300">
                                Address
                            </label>
                            <input
                                type="text"
                                defaultValue={mongoUser.address}
                                {...register("address")}
                                placeholder="Enter your address"
                                className="w-full px-4 py-3 text-base rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 transition-all outline-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-base"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Update Profile
                        </button>
                    </form>
                </div>

                {/* Win Statistics */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {/* Stats Header */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 p-6">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                            </svg>
                            Win Statistics
                        </h3>
                    </div>

                    {/* Stats Body */}
                    <div className="p-6 flex flex-col items-center">
                        {participations > 0 ? (
                            <>
                                {/* Pie Chart */}
                                <div className="mb-6">
                                    <PieChart width={280} height={280}>
                                        <Pie
                                            data={data}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={70}
                                            outerRadius={110}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </div>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5 border-2 border-blue-200 dark:border-blue-700/50">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                            </svg>
                                            <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">Participations</p>
                                        </div>
                                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{participations}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border-2 border-green-200 dark:border-green-700/50">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <p className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide">Total Wins</p>
                                        </div>
                                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">{wins}</p>
                                    </div>
                                </div>

                                {/* Win Rate */}
                                <div className="mt-6 w-full bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border-2 border-purple-200 dark:border-purple-700/50">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Win Rate</span>
                                        <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                            {participations > 0 ? ((wins / participations) * 100).toFixed(1) : 0}%
                                        </span>
                                    </div>
                                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                        <div
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2.5 rounded-full transition-all duration-500"
                                            style={{ width: `${participations > 0 ? (wins / participations) * 100 : 0}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 mb-4">
                                    <svg className="w-10 h-10 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Data Available</h4>
                                <p className="text-gray-600 dark:text-gray-400">Join contests to see your stats!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
