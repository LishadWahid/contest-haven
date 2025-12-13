import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrophy, FaUsers, FaCheckCircle, FaClock } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CreatorDashboard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch creator's contests
    const { data: myContests = [] } = useQuery({
        queryKey: ['myContests', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/my-contests/${user.email}`);
            return res.data;
        }
    });

    // Calculate statistics
    const totalContests = myContests.length;
    const approvedContests = myContests.filter(c => c.status === 'approved').length;
    const pendingContests = myContests.filter(c => c.status === 'pending').length;
    const rejectedContests = myContests.filter(c => c.status === 'rejected').length;

    const totalParticipants = myContests.reduce((sum, c) => sum + (c.participantsCount || 0), 0);
    const totalPrizePool = myContests.reduce((sum, c) => sum + (c.prize || 0), 0);

    // Chart data
    const contestData = myContests.map(contest => ({
        name: contest.name.substring(0, 15) + '...',
        participants: contest.participantsCount || 0,
        prize: contest.prize || 0
    })).slice(0, 5); // Top 5 contests

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 rounded-2xl p-8 shadow-xl">
                <h2 className="text-4xl font-bold text-white mb-2">Creator Dashboard</h2>
                <p className="text-white/90 text-lg">Manage and track your contests performance</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Contests */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold uppercase">My Contests</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalContests}</h3>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <FaTrophy className="text-2xl text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                </div>

                {/* Approved */}
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

                {/* Pending */}
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

                {/* Total Participants */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold uppercase">Participants</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalParticipants}</h3>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <FaUsers className="text-2xl text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Contest Performance Chart */}
            {contestData.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contest Performance (Top 5)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={contestData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="participants" fill="#8B5CF6" name="Participants" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-700/50">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-semibold uppercase">Total Prize Pool</p>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">${totalPrizePool}</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border-2 border-green-200 dark:border-green-700/50">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-semibold uppercase">Success Rate</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {totalContests > 0 ? ((approvedContests / totalContests) * 100).toFixed(1) : 0}%
                    </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-700/50">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-semibold uppercase">Avg Participants</p>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {approvedContests > 0 ? Math.round(totalParticipants / approvedContests) : 0}
                    </p>
                </div>
            </div>

            {/* Empty State */}
            {totalContests === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                        <FaTrophy className="text-4xl text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Contests Yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Start creating contests to see your dashboard statistics!</p>
                    <a href="/dashboard/add-contest" className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all">
                        Create Your First Contest
                    </a>
                </div>
            )}
        </div>
    );
};

export default CreatorDashboard;
