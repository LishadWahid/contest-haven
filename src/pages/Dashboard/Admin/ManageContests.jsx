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
        <div>
            <h2 className="text-3xl mb-6">Manage Contests</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Creator</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contests.map((contest, index) => (
                            <tr key={contest._id}>
                                <th>{index + 1}</th>
                                <td>{contest.name}</td>
                                <td>{contest.creator?.email}</td>
                                <td>{contest.status}</td>
                                <td>
                                    {contest.status === 'pending' && <button onClick={() => handleConfirm(contest)} className="btn btn-xs btn-success mr-2">Confirm</button>}
                                    <button onClick={() => handleDelete(contest)} className="btn btn-xs btn-error">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageContests;
