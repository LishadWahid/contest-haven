import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrophy, FaList, FaUserClock, FaMedal } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const UserDashboard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch participated contests
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    });

    // Fetch winning contests
    const { data: winningContests = [] } = useQuery({
        queryKey: ['winningContests', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/won/${user.email}`);
            return res.data;
        }
    });

    // Stats
    const totalParticipated = payments.length;
    const totalWins = winningContests.length;
    const totalSpent = payments.reduce((sum, p) => sum + (p.price || 0), 0);
    const winRate = totalParticipated > 0 ? ((totalWins / totalParticipated) * 100).toFixed(1) : 0;

    // Recent Activity (Last 3 participations)
    const recentActivity = [...payments].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

    // Chart Data
    const data = [
        { name: 'Won', value: totalWins, color: '#F59E0B' }, // Yellow/Amber
        { name: 'Participated', value: totalParticipated - totalWins, color: '#6366F1' } // Indigo
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-700 dark:via-indigo-700 dark:to-violet-700 rounded-2xl p-8 shadow-xl flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-bold text-white mb-2">My Dashboard</h2>
                    <p className="text-white/90 text-lg">Welcome back, {user?.displayName}!</p>
                </div>
                <div className="hidden md:block">
                    <img
                        src={user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white/30 shadow-2xl object-cover"
                    />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Participated */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-l-4 border-indigo-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold uppercase">Participated</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalParticipated}</h3>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                            <FaList className="text-2xl text-indigo-600 dark:text-indigo-400" />
                        </div>
                    </div>
                </div>

                {/* Wins */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold uppercase">Wins</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalWins}</h3>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                            <FaTrophy className="text-2xl text-yellow-600 dark:text-yellow-400" />
                        </div>
                    </div>
                </div>

                {/* Win Rate */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-l-4 border-emerald-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold uppercase">Win Rate</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{winRate}%</h3>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                            <FaMedal className="text-2xl text-emerald-600 dark:text-emerald-400" />
                        </div>
                    </div>
                </div>

                {/* Total Spent */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-l-4 border-pink-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold uppercase">Total Spent</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">${totalSpent}</h3>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                            <FaUserClock className="text-2xl text-pink-600 dark:text-pink-400" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Participation Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Participation Overview</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                        {data.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Participations</h3>
                    <div className="space-y-4">
                        {recentActivity.length > 0 ? (
                            recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <img src={activity.image} alt={activity.contestName} className="w-12 h-12 rounded-lg object-cover" />
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">{activity.contestName}</h4>
                                        <p className="text-sm text-gray-500">
                                            {new Date(activity.date || Date.now()).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className="font-bold text-indigo-600 dark:text-indigo-400">${activity.price}</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-500">
                                No recent activity
                            </div>
                        )}
                    </div>
                    {recentActivity.length > 0 && (
                        <div className="mt-6 text-center">
                            <a href="/dashboard/participated" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">View All Activity</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
