import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { useQuery } from '@tanstack/react-query';

const UserProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm();

    // Fetch stats
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    });

    // Fetch wins (using same logic as WinningContests - simple client filter)
    const { data: allContests = [] } = useQuery({
        queryKey: ['allContestsStat'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests');
            return res.data;
        }
    })
    const wins = allContests.filter(c => c.winner?.email === user.email).length;
    const participations = payments.length;
    // Win percentage chart
    const data = [
        { name: 'Wins', value: wins },
        { name: 'Participations', value: participations },
    ];
    const COLORS = ['#0088FE', '#FFBB28'];

    const onSubmit = (data) => {
        // Update Firebase Profile
        updateUserProfile(data.name, data.photoURL)
            .then(() => {
                // Update DB logic here if needed
            })
            .catch(err => console.log(err));

        toast.success("Profile Updated");
    }

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">My Profile</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control">
                        <label className="label">Name</label>
                        <input type="text" defaultValue={user?.displayName} {...register("name")} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">Photo URL</label>
                        <input type="text" defaultValue={user?.photoURL} {...register("photoURL")} className="input input-bordered" />
                    </div>
                    <button className="btn btn-primary">Update</button>
                </form>
            </div>

            <div className="md:w-1/2">
                <h2 className="text-2xl font-bold">Win Status</h2>

                <PieChart width={300} height={300}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
                <div className="text-center">
                    <p>Total Participations: {participations}</p>
                    <p>Total Wins: {wins}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
