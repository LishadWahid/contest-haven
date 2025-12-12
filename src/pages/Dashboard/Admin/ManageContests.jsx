import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageContests = () => {
    const axiosSecure = useAxiosSecure();
    const { data: contests = [], refetch } = useQuery({
        queryKey: ['admin-contests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests/admin/all');
            return res.data;
        }
    });

    const handleConfirm = (contest) => {
        axiosSecure.patch(`/contests/status/${contest._id}`, { status: 'approved' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Contest Approved!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleReject = (contest) => {
        axiosSecure.patch(`/contests/status/${contest._id}`, { status: 'rejected' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "warning",
                        title: "Contest Rejected!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDelete = (contest) => {
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
                axiosSecure.delete(`/contests/${contest._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0 || res.data?._id) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Contest has been deleted.",
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
            <div className="bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 dark:from-green-700 dark:via-teal-700 dark:to-cyan-700 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-2">Manage Contests</h2>
                        <p className="text-white/90 text-lg">Total Contests: <span className="font-bold">{contests.length}</span></p>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-teal-600 dark:to-cyan-700">
                            <tr>
                                <th className="text-white font-semibold">#</th>
                                <th className="text-white font-semibold">Contest Name</th>
                                <th className="text-white font-semibold">Creator</th>
                                <th className="text-white font-semibold">Status</th>
                                <th className="text-white font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contests.map((contest, index) => (
                                <tr key={contest._id} className="hover:bg-teal-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-200 dark:border-gray-700">
                                    <th className="text-gray-900 dark:text-gray-100 font-bold">{index + 1}</th>
                                    <td className="font-semibold text-gray-900 dark:text-white">{contest.name}</td>
                                    <td className="text-gray-600 dark:text-gray-400">{contest.creator?.email}</td>
                                    <td>
                                        <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-semibold ${contest.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                                contest.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                            }`}>
                                            {contest.status === 'approved' && '✓ '}
                                            {contest.status === 'pending' && '⏳ '}
                                            {contest.status === 'rejected' && '✗ '}
                                            {contest.status.charAt(0).toUpperCase() + contest.status.slice(1)}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            {contest.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleConfirm(contest)}
                                                        className="btn btn-xs bg-green-600 hover:bg-green-700 text-white border-none"
                                                    >
                                                        ✓ Confirm
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(contest)}
                                                        className="btn btn-xs bg-yellow-600 hover:bg-yellow-700 text-white border-none"
                                                    >
                                                        ⚠ Reject
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => handleDelete(contest)}
                                                className="btn btn-xs bg-red-600 hover:bg-red-700 text-white border-none"
                                            >
                                                🗑 Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {contests.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-100 dark:bg-teal-900/30 mb-4">
                            <svg className="w-10 h-10 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Contests Found</h3>
                        <p className="text-gray-600 dark:text-gray-400">There are no contests to manage.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageContests;
