import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from '@tanstack/react-query';

const Leaderboard = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch all contests to calculate wins
    const { data: contests = [] } = useQuery({
        queryKey: ['allContestsLeaderboard'],
        queryFn: async () => {
            const res = await axiosPublic.get('/contests');
            return res.data;
        }
    });

    // Aggregate wins
    const winsMap = {};
    contests.forEach(contest => {
        if (contest.winner?.email) {
            const email = contest.winner.email;
            if (!winsMap[email]) {
                winsMap[email] = {
                    email: email,
                    name: contest.winner.name,
                    photo: contest.winner.photo || 'https://placehold.co/50',
                    wins: 0
                }
            }
            winsMap[email].wins += 1;
        }
    });

    const leaderboard = Object.values(winsMap).sort((a, b) => b.wins - a.wins);

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
