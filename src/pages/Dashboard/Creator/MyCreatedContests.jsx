import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const MyCreatedContests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: contests = [], refetch } = useQuery({
        queryKey: ['my-contests', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/my-contests/${user.email}`);
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/contests/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your contest has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className="space-y-6">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 dark:from-orange-700 dark:via-amber-700 dark:to-yellow-700 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-2">My Contests</h2>
                        <p className="text-white/90 text-lg">Total Created: <span className="font-bold">{contests.length}</span></p>
                    </div>
                    <Link to="/dashboard/add-contest" className="hidden md:inline-flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl backdrop-blur-sm transition-all border border-white/40">
                        + Add New
                    </Link>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gradient-to-r from-orange-400 to-amber-500 dark:from-orange-600 dark:to-amber-700">
                            <tr>
                                <th className="text-white font-semibold py-4">Image</th>
                                <th className="text-white font-semibold py-4">Contest Name</th>
                                <th className="text-white font-semibold py-4">Status</th>
                                <th className="text-white font-semibold py-4 text-center">Participants</th>
                                <th className="text-white font-semibold py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contests.map((contest) => (
                                <tr key={contest._id} className="hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-200 dark:border-gray-700">
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12 bg-gray-100">
                                                <img src={contest.image} alt={contest.name} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold text-gray-900 dark:text-white text-base">{contest.name}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{contest.type}</div>
                                    </td>
                                    <td>
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${contest.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                            contest.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                            }`}>
                                            {contest.status}
                                        </span>
                                    </td>
                                    <td className="text-center font-semibold text-gray-700 dark:text-gray-300">
                                        {contest.participantsCount}
                                    </td>
                                    <td className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            {contest.status === 'pending' && (
                                                <>
                                                    <Link
                                                        to={`/dashboard/edit-contest/${contest._id}`}
                                                        className="btn btn-sm btn-circle btn-ghost bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 tooltip" data-tip="Edit"
                                                    >
                                                        <FaEdit />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(contest._id)}
                                                        className="btn btn-sm btn-circle btn-ghost bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 tooltip" data-tip="Delete"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </>
                                            )}
                                            {contest.status === 'approved' && (
                                                <Link
                                                    to={`/dashboard/submissions/${contest._id}`}
                                                    className="btn btn-sm px-4 bg-gradient-to-r from-green-500 to-emerald-600 !text-white border-none hover:shadow-lg hover:scale-105 transition-all w-auto h-9 font-medium"
                                                >
                                                    See Submissions
                                                </Link>
                                            )}
                                            {contest.status === 'rejected' && (
                                                <span className="text-xs text-gray-400 italic">No actions available</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {contests.length === 0 && (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/30 mb-4">
                            <svg className="w-10 h-10 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Contests Created</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">Start your journey by creating your first contest.</p>
                        <Link to="/dashboard/add-contest" className="btn bg-orange-500 hover:bg-orange-600 text-white border-none px-6">
                            Create Contest
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCreatedContests;
