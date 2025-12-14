import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleRoleChange = (user, newRole) => {
        axiosSecure.patch(`/users/role/${user._id}`, { role: newRole })
            .then(res => {
                if (res.data.modifiedCount > 0 || res.data._id) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now a ${newRole}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="space-y-6">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-700 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-2">Manage Users</h2>
                        <p className="text-white/90 text-lg">Total Users: <span className="font-bold">{users.length}</span></p>
                    </div>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700">
                            <tr>
                                <th className="text-white font-semibold">#</th>
                                <th className="text-white font-semibold">Name</th>
                                <th className="text-white font-semibold">Email</th>
                                <th className="text-white font-semibold">Current Role</th>
                                <th className="text-white font-semibold">Change Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, index) => (
                                <tr key={user._id} className="hover:bg-purple-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-200 dark:border-gray-700">
                                    <th className="text-gray-900 dark:text-gray-100 font-bold">{indexOfFirstItem + index + 1}</th>
                                    <td className="font-semibold text-gray-900 dark:text-white">{user.name}</td>
                                    <td className="text-gray-600 dark:text-gray-400">{user.email}</td>
                                    <td>
                                        <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-semibold ${user.role === 'admin'
                                            ? 'bg-red-100 text-red-700 dark:bg-red-900/10'
                                            : user.role === 'creator'
                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/10'
                                                : 'bg-green-100 text-green-700 dark:bg-green-900/10'
                                            }`}>
                                            {user.role === 'admin' && '👑 '}
                                            {user.role === 'creator' && '✨ '}
                                            {user.role === 'user' && '👤 '}
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            className="select select-bordered select-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400"
                                            defaultValue={user.role}
                                            onChange={(e) => handleRoleChange(user, e.target.value)}
                                        >
                                            <option value="user">User</option>
                                            <option value="creator">Creator</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {users.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Users Found</h3>
                    </div>
                )}

                {/* Pagination Controls */}
                {users.length > itemsPerPage && (
                    <div className="flex justify-center items-center py-6 gap-2">
                        <button
                            className="btn btn-sm btn-outline"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Prev
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-ghost'}`}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            className="btn btn-sm btn-outline"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
