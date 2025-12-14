
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { FaTrophy, FaDollarSign, FaUserFriends, FaClock, FaTag, FaArrowLeft, FaCheckCircle, FaCrown } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const ContestDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch Contest Details
    const { data: contest = {}, refetch } = useQuery({
        queryKey: ['contest', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/contests/${id}`);
            return res.data;
        }
    });

    // Fetch User Payment Status for this contest
    const { data: isRegistered = false } = useQuery({
        queryKey: ['isRegistered', id, user?.email],
        enabled: !!user?.email && !!id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`);
            // Check if any payment matches this contest ID
            const found = res.data.find(payment => payment.contestId === id);
            return !!found;
        }
    });

    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const taskUrl = form.task.value;

        const submissionData = {
            contestId: id,
            contestName: contest.name,
            userName: user?.displayName,
            userEmail: user?.email,
            userPhoto: user?.photoURL, // Capture photo for winner display
            taskUrl,
            submittedAt: new Date()
        }

        const res = await axiosSecure.post('/submissions', submissionData);
        if (res.data.insertedId) {
            Swal.fire({
                title: "Submitted!",
                text: "Your task has been submitted successfully.",
                icon: "success"
            });
            setIsModalOpen(false);
            form.reset();
        }
    };

    const formatDeadline = (deadline) => {
        if (!deadline) return { text: "Loading...", color: "text-gray-500" };
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
    const isContestEnded = deadline.text === "Contest Ended" || contest.status === 'ended' || contest.winner;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <Link
                    to="/all-contests"
                    className="inline-flex items-center gap-2 mb-8 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-semibold group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to All Contests
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Image */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700 group relative h-80">
                            <img
                                src={contest.image}
                                alt={contest.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm flex items-center gap-2">
                                <FaTag />
                                {contest.type}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 space-y-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FaCheckCircle className="text-purple-600" /> Quick Stats
                            </h3>

                            {/* Stats Items */}
                            {[
                                { icon: FaTrophy, color: "bg-yellow-500", label: "Prize Money", value: `$${contest.prize}`, borderColor: "border-yellow-200" },
                                { icon: FaDollarSign, color: "bg-green-500", label: "Entry Fee", value: `$${contest.price}`, borderColor: "border-green-200" },
                                { icon: FaUserFriends, color: "bg-blue-500", label: "Participants", value: contest.participantsCount, borderColor: "border-blue-200" },
                                { icon: FaClock, color: "bg-red-500", label: "Deadline", value: deadline.text, sub: new Date(contest.deadline).toLocaleDateString(), borderColor: "border-red-200" }
                            ].map((stat, idx) => (
                                <div key={idx} className={`flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border ${stat.borderColor} dark:border-gray-700`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center shadow-lg text-white text-xl`}>
                                            <stat.icon />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                                            <p className={`text-lg font-bold text-gray-900 dark:text-white`}>{stat.value}</p>
                                            {stat.sub && <p className="text-xs text-gray-500">{stat.sub}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title & Status */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 leading-tight">
                                {contest.name}
                            </h1>
                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                                {contest.description}
                            </p>
                        </div>

                        {/* Winner Section */}
                        {contest.winner && (
                            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-3xl p-8 shadow-xl border border-yellow-200 dark:border-yellow-700 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <FaCrown className="text-9xl text-yellow-600" />
                                </div>
                                <div className="relative z-10 flex items-center gap-6">
                                    <img
                                        src={contest.winner.photo}
                                        alt={contest.winner.name}
                                        className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                                    />
                                    <div>
                                        <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200 uppercase tracking-widest mb-1">Winner Declared</h3>
                                        <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{contest.winner.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Congratulations on winning the prize!</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Area */}
                        {!contest.winner && (
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl text-white">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div>
                                        <h3 className="text-3xl font-bold mb-2">
                                            {isContestEnded ? "Contest Has Ended" : "Ready to Compete?"}
                                        </h3>
                                        <p className="text-purple-100">
                                            {isContestEnded
                                                ? "Submissions are closed. Waiting for winner declaration."
                                                : `Join ${contest.participantsCount} other contestants and win $${contest.prize}!`
                                            }
                                        </p>
                                    </div>

                                    {/* Logic Buttons */}
                                    {!isContestEnded && (
                                        <>
                                            {!user ? (
                                                <button onClick={() => navigate('/login')} className="btn bg-white text-purple-600 hover:bg-gray-100 border-none px-8 py-4 text-lg font-bold rounded-xl shadow-xl">
                                                    Login to Register
                                                </button>
                                            ) : isRegistered ? (
                                                <button
                                                    onClick={() => setIsModalOpen(true)}
                                                    className="btn bg-green-500 text-white hover:bg-green-600 border-none px-8 py-4 text-lg font-bold rounded-xl shadow-xl"
                                                >
                                                    Submit Task
                                                </button>
                                            ) : (
                                                <Link
                                                    to={`/payment/${id}`}
                                                    className="btn bg-white text-purple-600 hover:bg-gray-100 border-none px-8 py-4 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl"
                                                >
                                                    Register - ${contest.price}
                                                </Link>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Task Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Submit Your Work</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                                Please provide the Google Drive link or direct URL to your submission. Ensure access is open.
                            </p>
                            <form onSubmit={handleTaskSubmit}>
                                <textarea
                                    name="task"
                                    required
                                    placeholder="Paste your submission link here..."
                                    className="w-full h-32 p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none mb-6"
                                ></textarea>
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="btn btn-ghost text-gray-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn bg-purple-600 text-white hover:bg-purple-700 border-none"
                                    >
                                        Submit Entry
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContestDetails;
