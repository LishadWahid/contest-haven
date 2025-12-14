import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const EditContest = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // Fetch contest data
    const { data: contest = {}, isLoading } = useQuery({
        queryKey: ['contest-edit', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}`);
            return res.data;
        }
    });

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const updatedContest = {
            name: data.name,
            price: data.price,
            prize: data.prize,
            description: data.description,
            instruction: data.instruction,
            type: data.type,
            // Assuming image URL can also be updated
            image: data.image
        }

        const res = await axiosSecure.patch(`/contests/${id}`, updatedContest);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Contest Updated",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/my-contests');
        }
    }

    if (isLoading) return (
        <div className="flex h-screen items-center justify-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-700 dark:via-indigo-700 dark:to-violet-700 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-2">Edit Contest</h2>
                        <p className="text-white/90 text-lg">Update details for <span className="font-bold underline decoration-white/30">{contest.name}</span></p>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Name */}
                        <div className="form-control space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Contest Name</label>
                            <input
                                type="text"
                                defaultValue={contest.name}
                                {...register("name")}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        {/* Image URL (Optional but good to have) */}
                        <div className="form-control space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Image URL</label>
                            <input
                                type="text"
                                defaultValue={contest.image}
                                {...register("image")}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        {/* Price */}
                        <div className="form-control space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Entry Fee ($)</label>
                            <input
                                type="number"
                                defaultValue={contest.price}
                                {...register("price")}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        {/* Prize */}
                        <div className="form-control space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Prize Money ($)</label>
                            <input
                                type="text"
                                defaultValue={contest.prize}
                                {...register("prize")}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        {/* Type */}
                        <div className="form-control space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Contest Type</label>
                            <select
                                defaultValue={contest.type}
                                {...register("type")}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            >
                                <option value="Image Design">Image Design</option>
                                <option value="Article Writing">Article Writing</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Business Idea">Business Idea</option>
                            </select>
                        </div>

                        {/* Spacer for 2-column layout balance if needed, or remove if Image URL is used */}
                        <div className="hidden md:block"></div>


                        {/* Description */}
                        <div className="form-control md:col-span-2 space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</label>
                            <textarea
                                defaultValue={contest.description}
                                {...register("description")}
                                className="w-full px-4 py-3 h-32 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                            ></textarea>
                        </div>

                        {/* Instruction */}
                        <div className="form-control md:col-span-2 space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Task Instruction</label>
                            <textarea
                                defaultValue={contest.instruction}
                                {...register("instruction")}
                                className="w-full px-4 py-3 h-32 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <button className="btn w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                        💾 Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditContest;
