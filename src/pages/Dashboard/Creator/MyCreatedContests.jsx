import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

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
        <div>
            <h2 className="text-3xl font-bold mb-6">My Created Contests: {contests.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Participants</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contests.map((contest, index) => (
                            <tr key={contest._id}>
                                <th>{index + 1}</th>
                                <td>{contest.name}</td>
                                <td>{contest.status}</td>
                                <td>{contest.participantsCount}</td>
                                <td>
                                    {contest.status === 'pending' && (
                                        <>
                                            <Link to={`/dashboard/edit-contest/${contest._id}`} className="btn btn-xs btn-info mr-2">Edit</Link>
                                            <button onClick={() => handleDelete(contest._id)} className="btn btn-xs btn-error">Delete</button>
                                        </>
                                    )}
                                    {contest.status === 'approved' && (
                                        <Link to={`/dashboard/submissions/${contest._id}`} className="btn btn-xs btn-success ml-2">See Submissions</Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCreatedContests;
