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
                <span className="loading loading-spinner loading-lg text-primary"></span>
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
                    <h2 className="text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
                        Popular Contests
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Join the most trending challenges happening right now 🔥
                    </p>
                </div>
                <Link
                    to="/all-contests"
                    className="btn btn-outline border-2 border-primary text-primary hover:bg-primary hover:text-white hover:border-primary dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:border-primary transition-all rounded-full px-8 shadow-lg hover:shadow-xl"
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
                            className="group relative bg-white dark:bg-gray-800/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-primary/20 hover:border-primary dark:border-gray-700 flex flex-col h-full w-full"
                            style={{
                                animationDelay: `${index * 100}ms`
                            }}
                        >
                            {/* Image Section */}
                            <figure className="h-56 overflow-hidden relative shrink-0">
                                <img
                                    src={contest.image}
                                    alt={contest.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Lighter gradient for better visibility */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                                {/* Overlay Content */}
                                <div className="absolute top-4 right-4 z-10">
                                    <span className="bg-white/95 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg">
                                        {contest.type}
                                    </span>
                                </div>

                                <div className="absolute bottom-4 left-4 right-4 z-10">
                                    <h2 className="text-xl font-bold text-white mb-1 line-clamp-1 drop-shadow-md group-hover:text-secondary transition-colors">
                                        {contest.name}
                                    </h2>
                                    <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                                        <FaUserFriends className="text-blue-300" />
                                        <span>{contest.participantsCount} Participants</span>
                                    </div>
                                </div>
                            </figure>

                            {/* Content Body */}
                            <div className="p-5 flex flex-col flex-grow">
                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Prize Pool</span>
                                        <span className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1">
                                            <FaTrophy className="text-accent" /> ${contest.prize}
                                        </span>
                                    </div>
                                    <div className="text-right flex flex-col items-end">
                                        <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Deadline</span>
                                        <span className={`text-sm font-bold ${formatDeadline(contest.deadline) === 'Ended' ? 'text-red-500' : 'text-green-600'}`}>
                                            {formatDeadline(contest.deadline)}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-6 leading-relaxed">
                                    {contest.description}
                                </p>

                                <div className="mt-auto">
                                    <button className="w-full btn btn-primary btn-sm rounded-lg text-white font-bold shadow-md hover:shadow-lg group-hover:scale-[1.02] transition-transform">
                                        View Details <FaArrowRight />
                                    </button>
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
