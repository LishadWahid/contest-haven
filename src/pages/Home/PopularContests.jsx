import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from '@tanstack/react-query';
import { FaUserFriends, FaTrophy, FaArrowRight, FaClock, FaDollarSign } from "react-icons/fa";

const PopularContests = () => {
    const axiosPublic = useAxiosPublic();

    const { data: popular = [], isLoading } = useQuery({
        queryKey: ['popularContests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/contests/popular');
            return res.data;
        }
    })

    if (isLoading) {
        return (
            <div className="min-h-[400px] flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-purple-600"></span>
            </div>
        )
    }

    const formatDeadline = (deadline) => {
        const date = new Date(deadline);
        const now = new Date();
        const diffTime = date - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return "Ended";
        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Tomorrow";
        return `${diffDays} days left`;
    };

    return (
        <div className="my-20 px-4 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-4">
                <div className="text-center md:text-left">
                    <h2 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                        Popular Contests
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Join the most trending challenges happening right now 🔥
                    </p>
                </div>
                <Link
                    to="/all-contests"
                    className="btn btn-outline border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-500 dark:hover:border-purple-500 transition-all rounded-full px-8 shadow-lg hover:shadow-xl"
                >
                    View All <FaArrowRight className="ml-2" />
                </Link>
            </div>

            {/* Contest Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    popular.map((contest, index) => (
                        <div
                            key={contest._id}
                            className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 dark:border-gray-700"
                            style={{
                                animationDelay: `${index * 100}ms`
                            }}
                        >
                            {/* Contest Type Badge */}
                            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                                {contest.type}
                            </div>

                            {/* Participants Badge */}
                            <div className="absolute top-4 left-4 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                                <FaUserFriends className="text-blue-600 dark:text-blue-400" />
                                <span className="text-gray-800 dark:text-gray-100">{contest.participantsCount}</span>
                            </div>

                            {/* Image Section */}
                            <figure className="h-64 overflow-hidden relative">
                                <img
                                    src={contest.image}
                                    alt={contest.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                {/* Prize Money Overlay */}
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                    <div className="bg-yellow-500/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                        <FaTrophy className="text-white text-lg" />
                                        <span className="text-white font-bold text-lg">${contest.prize}</span>
                                    </div>
                                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                                        <FaClock className="text-red-500 text-sm" />
                                        <span className="text-gray-800 dark:text-gray-100 font-semibold text-xs">
                                            {formatDeadline(contest.deadline)}
                                        </span>
                                    </div>
                                </div>
                            </figure>

                            {/* Content Section */}
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                    {contest.name}
                                </h2>

                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-2 min-h-[2.5rem]">
                                    {contest.description}
                                </p>

                                {/* Entry Fee */}
                                <div className="flex items-center gap-2 mb-6 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                                    <FaDollarSign className="text-green-600 dark:text-green-400" />
                                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                                        Entry Fee: <span className="font-bold text-gray-900 dark:text-white">${contest.price}</span>
                                    </span>
                                </div>

                                {/* Action Button */}
                                <Link to={`/contest/${contest._id}`} className="block w-full">
                                    <button className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2">
                                        View Details
                                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                        </div>
                    ))
                }
            </div>

            {/* Empty State */}
            {popular.length === 0 && (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Contests Yet</h3>
                    <p className="text-gray-600 dark:text-gray-400">Check back soon for exciting contests!</p>
                </div>
            )}
        </div>
    );
};

export default PopularContests;
