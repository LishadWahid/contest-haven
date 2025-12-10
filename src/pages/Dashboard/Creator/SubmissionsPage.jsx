import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const SubmissionsPage = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: submissions = [] } = useQuery({
        queryKey: ['submissions', id],
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
                photo: 'https://placehold.co/100'
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
        <div>
            <h2 className="text-3xl mb-4">Submissions for Contest</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {submissions.map(sub => (
                    <div key={sub._id} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h3 className="font-bold">{sub.userName}</h3>
                            <p className="text-sm">{sub.userEmail}</p>
                            <p className="border p-2 bg-gray-100 rounded my-2 break-all">{sub.taskUrl}</p>
                            <div className="card-actions justify-end">
                                <button onClick={() => handleDeclareWinner(sub)} className="btn btn-primary btn-sm">Declare Winner</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubmissionsPage;
