import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaTrophy, FaCheckCircle, FaClock } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all data
    const { data: users = [] } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const { data: contests = [] } = useQuery({
        queryKey: ['allContests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests/admin/all');
            return res.data;
        }
    });

    const { data: payments = [] } = useQuery({
        queryKey: ['allPayments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments/all');
            return res.data || [];
        }
    });

    // Calculate statistics
    const totalUsers = users.length;
    const adminCount = users.filter(u => u.role === 'admin').length;
    const creatorCount = users.filter(u => u.role === 'creator').length;
    const userCount = users.filter(u => u.role === 'user').length;

    const totalContests = contests.length;
    const approvedContests = contests.filter(c => c.status === 'approved').length;
    const pendingContests = contests.filter(c => c.status === 'pending').length;
    const rejectedContests = contests.filter(c => c.status === 'rejected').length;

    const totalRevenue = payments.reduce((sum, p) => sum + (p.price || 0), 0);

    // Chart data
    const roleData = [
        { name: 'Admins', value: adminCount, color: '#EF4444' },
        { name: 'Creators', value: creatorCount, color: '#3B82F6' },
        { name: 'Users', value: userCount, color: '#10B981' }
    ];

    const contestData = [
        { name: 'Approved', count: approvedContests },
        { name: 'Pending', count: pendingContests },
        { name: 'Rejected', count: rejectedContests }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-700 dark:via-pink-700 dark:to-red-700 rounded-2xl p-8 shadow-xl">
                <h2 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h2>
                <p className="text-white/90 text-lg">Complete overview of ContestHub platform</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Users */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold uppercase">Total Users</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalUsers}</h3>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <FaUsers className="text-2xl text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                </div>

                {/* Total Contests */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold uppercase">Total Contests</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalContests}</h3>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <FaTrophy className="text-2xl text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                </div>

                {/* Approved Contests */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold uppercase">Approved</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{approvedContests}</h3>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <FaCheckCircle className="text-2xl text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                </div>

                {/* Pending Contests */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold uppercase">Pending</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{pendingContests}</h3>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                            <FaClock className="text-2xl text-yellow-600 dark:text-yellow-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Roles Distribution */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">User Roles Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={roleData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {roleData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Contest Status */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contest Status Overview</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={contestData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8B5CF6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Platform Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Revenue</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${totalRevenue.toFixed(2)}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Active Creators</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{creatorCount}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Active Participants</p>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{userCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
