import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const SubmissionsPage = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: submissions = [], refetch } = useQuery({
        queryKey: ['submissions', id],
        refetchOnMount: 'always',
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/${id}`);
            return res.data;
        }
    });

    const handleDeclareWinner = (submission) => {
        // Update contest with winner details
        const winnerInfo = {
            winner: {
                email: submission.userEmail,
                name: submission.userName,
                photo: submission.userPhoto || 'https://placehold.co/100'
            },
            status: 'ended'
        }

        axiosSecure.patch(`/contests/${id}`, winnerInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Winner Declared!",
                        text: `${submission.userName} is the winner!`,
                        icon: "success"
                    });
                }
            })
    }

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Submissions for Contest</h2>

            {submissions.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <p className="text-gray-500">No submissions yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {submissions.map(sub => (
                        <div key={sub._id} className="card bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700">
                            <div className="card-body">
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={sub.userPhoto || 'https://placehold.co/100'}
                                        alt={sub.userName}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                                    />
                                    <div>
                                        <h3 className="font-bold text-lg">{sub.userName}</h3>
                                        <p className="text-xs text-gray-500">{sub.userEmail}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4">
                                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">Submitted Task:</p>
                                    <p className="text-sm break-all text-blue-600 hover:underline">
                                        <a href={sub.taskUrl} target="_blank" rel="noopener noreferrer">
                                            {sub.taskUrl}
                                        </a>
                                    </p>
                                </div>
                                <div className="card-actions justify-end mt-auto">
                                    <button
                                        onClick={() => handleDeclareWinner(sub)}
                                        className="btn btn-primary btn-sm w-full"
                                    >
                                        Declare Winner
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SubmissionsPage;
