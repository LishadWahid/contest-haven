import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from '@tanstack/react-query';
import { FaTrophy } from 'react-icons/fa';

const Leaderboard = () => {
    const axiosPublic = useAxiosPublic();

    const { data: leaderboard = [] } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users/leaderboard');
            return res.data;
        },
        staleTime: 0,
        refetchOnMount: 'always',
        refetchOnWindowFocus: true
    });

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
                            <tr key={user._id}>
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
                                            <div className="text-sm opacity-50">{user._id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="font-bold text-lg text-orange-500">
                                        <FaTrophy className="inline mr-1 mb-1" />
                                        {user.wins}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {leaderboard.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-lg">No winners declared yet!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
