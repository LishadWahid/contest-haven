import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from '@tanstack/react-query';

const Leaderboard = () => {
    const axiosPublic = useAxiosPublic();

    const { data: leaderboard = [] } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users/leaderboard');
            return res.data;
        }
    });

    // Client-side aggregation removed in favor of server-side aggregation

    return (
        <div className="my-10 px-4">
            <h2 className="text-3xl text-center font-bold mb-8">Leaderboard</h2>
            <div className="overflow-x-auto max-w-4xl mx-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Wins</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((user, index) => (
                            <tr key={user.email}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.photo} alt={user.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            <div className="text-sm opacity-50">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.wins}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {leaderboard.length === 0 && <p className="text-center mt-4">No winners yet!</p>}
            </div>
        </div>
    );
};

export default Leaderboard;
