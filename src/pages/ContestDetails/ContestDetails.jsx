import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaTrophy, FaDollarSign, FaUserFriends, FaClock, FaTag, FaArrowLeft, FaCheckCircle } from "react-icons/fa";

const ContestDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: contest = {}, isLoading } = useQuery({
        queryKey: ['contest', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/contests/${id}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
                <span className="loading loading-spinner loading-lg text-purple-600"></span>
            </div>
        );
    }

    const formatDeadline = (deadline) => {
        const date = new Date(deadline);
        const now = new Date();
        const diffTime = date - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { text: "Contest Ended", color: "text-red-600 dark:text-red-400" };
        if (diffDays === 0) return { text: "Ends Today!", color: "text-orange-600 dark:text-orange-400" };
        if (diffDays === 1) return { text: "Ends Tomorrow", color: "text-yellow-600 dark:text-yellow-400" };
        return { text: `${diffDays} Days Left`, color: "text-green-600 dark:text-green-400" };
    };

    const deadline = formatDeadline(contest.deadline);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <Link
                    to="/all-contests"
                    className="inline-flex items-center gap-2 mb-8 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-semibold group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to All Contests
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Image & Quick Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Contest Image Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700 group">
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={contest.image}
                                    alt={contest.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                {/* Contest Type Badge */}
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm flex items-center gap-2">
                                    <FaTag />
                                    {contest.type}
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FaCheckCircle className="text-purple-600" />
                                Quick Stats
                            </h3>
                            <div className="space-y-4">
                                {/* Prize */}
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                                            <FaTrophy className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Prize Money</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">${contest.prize}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Entry Fee */}
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                            <FaDollarSign className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Entry Fee</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">${contest.price}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Participants */}
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                            <FaUserFriends className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Participants</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{contest.participantsCount}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Deadline */}
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border border-red-200 dark:border-red-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                                            <FaClock className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Deadline</p>
                                            <p className={`text-lg font-bold ${deadline.color}`}>{deadline.text}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {new Date(contest.deadline).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Contest Title Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 leading-tight">
                                {contest.name}
                            </h1>
                            <div className="flex flex-wrap gap-3 items-center">
                                <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold border border-purple-200 dark:border-purple-700">
                                    {contest.type}
                                </span>
                                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${deadline.text === "Contest Ended"
                                        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700"
                                        : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700"
                                    }`}>
                                    {deadline.text === "Contest Ended" ? "🔴 Closed" : "🟢 Active"}
                                </span>
                            </div>
                        </div>

                        {/* Description Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                📋 Contest Description
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                                {contest.description}
                            </p>
                        </div>

                        {/* Contest Information Table */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                📊 Contest Information
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        <tr className="hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors">
                                            <td className="py-4 px-6 font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-3">
                                                <FaTrophy className="text-yellow-500 text-xl" />
                                                Prize Money
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                                                    ${contest.prize}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors">
                                            <td className="py-4 px-6 font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-3">
                                                <FaDollarSign className="text-green-500 text-xl" />
                                                Entry Fee
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                                    ${contest.price}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors">
                                            <td className="py-4 px-6 font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-3">
                                                <FaUserFriends className="text-blue-500 text-xl" />
                                                Total Participants
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                                    {contest.participantsCount} Contestants
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors">
                                            <td className="py-4 px-6 font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-3">
                                                <FaTag className="text-purple-500 text-xl" />
                                                Contest Type
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-bold">
                                                    {contest.type}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors">
                                            <td className="py-4 px-6 font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-3">
                                                <FaClock className="text-red-500 text-xl" />
                                                Registration Deadline
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="text-right">
                                                    <p className={`text-xl font-bold ${deadline.color}`}>
                                                        {deadline.text}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        {new Date(contest.deadline).toLocaleDateString('en-US', {
                                                            weekday: 'long',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl text-white">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-3xl font-bold mb-2">Ready to Compete?</h3>
                                    <p className="text-purple-100">Join {contest.participantsCount} other contestants and win ${contest.prize}!</p>
                                </div>
                                <Link
                                    to={`/payment/${id}`}
                                    className="btn bg-white text-purple-600 hover:bg-gray-100 border-none px-8 py-4 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
                                >
                                    Register Now - ${contest.price}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestDetails;
