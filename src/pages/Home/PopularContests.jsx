import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from '@tanstack/react-query';
import { FaUserFriends, FaTrophy, FaArrowRight, FaClock } from "react-icons/fa";

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
        <div className="my-20 px-4 w-full mx-auto">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {
                    popular.map((contest, index) => (
                        <Link
                            to={`/contest/${contest._id}`}
                            key={contest._id}
                            className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ring-1 ring-gray-100 dark:ring-gray-700 flex flex-col h-full w-full"
                            style={{
                                animationDelay: `${index * 75}ms`
                            }}
                        >
                            {/* Image Section - Larger */}
                            <figure className="h-56 overflow-hidden relative shrink-0">
                                <img
                                    src={contest.image}
                                    alt={contest.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>

                                {/* Tags - Floating on Image */}
                                <div className="absolute top-3 right-3">
                                    <span className="bg-white/95 dark:bg-gray-900/95 text-purple-600 dark:text-purple-400 px-3 py-1 rounded text-xs font-bold shadow-sm backdrop-blur-sm uppercase tracking-wider">
                                        {contest.type}
                                    </span>
                                </div>

                                {/* Price Tag on Image */}
                                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                                    <FaTrophy className="text-yellow-400 text-sm" />
                                    <span className="text-white text-sm font-bold">${contest.prize}</span>
                                </div>
                            </figure>

                            {/* Content Section - Dense & Informative */}
                            <div className="p-5 flex flex-col flex-grow">
                                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-1 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                    {contest.name}
                                </h2>

                                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 h-10 leading-relaxed">
                                    {contest.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <FaUserFriends className="text-blue-500/80" />
                                            <span>{contest.participantsCount}</span>
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                        <span>{formatDeadline(contest.deadline)}</span>
                                    </div>

                                    <div className="flex items-center text-purple-600 dark:text-purple-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-1 group-hover:translate-x-0 duration-300">
                                        Join <FaArrowRight className="ml-1 text-[10px]" />
                                    </div>
                                </div>
                            </div>
                        </Link>
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
