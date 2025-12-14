import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const AddContest = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [startDate, setStartDate] = useState(new Date());

    const onSubmit = async (data) => {
        const contestData = {
            name: data.name,
            image: data.image,
            description: data.description,
            instruction: data.instruction,
            price: parseFloat(data.price),
            prize: data.prize,
            type: data.type,
            deadline: startDate,
            creator: {
                name: user?.displayName,
                email: user?.email,
                photo: user?.photoURL
            },
            status: 'pending',
            participantsCount: 0
        }

        const contestRes = await axiosSecure.post('/contests', contestData);
        if (contestRes.data.insertedId || contestRes.data._id) {
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Contest added successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <div className="space-y-6">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 dark:from-pink-700 dark:via-rose-700 dark:to-red-700 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-2">Create New Contest</h2>
                        <p className="text-white/90 text-lg">Share your challenge with the world</p>
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
                                placeholder="e.g. Ultimate Logo Design"
                                {...register("name", { required: true })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                            />
                        </div>

                        {/* Image URL */}
                        <div className="form-control space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Image URL</label>
                            <input
                                type="text"
                                placeholder="https://..."
                                {...register("image", { required: true })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                            />
                        </div>

                        {/* Price */}
                        <div className="form-control space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Entry Fees ($)</label>
                            <input
                                type="number"
                                placeholder="0.00"
                                {...register("price", { required: true })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                            />
                        </div>

                        {/* Prize Money */}
                        <div className="form-control space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Prize Money ($)</label>
                            <input
                                type="text"
                                placeholder="1000"
                                {...register("prize", { required: true })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                            />
                        </div>

                        {/* Type */}
                        <div className="form-control space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Contest Type</label>
                            <select
                                defaultValue="default"
                                {...register("type", { required: true })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                            >
                                <option disabled value="default">Select a type</option>
                                <option value="Image Design">Image Design</option>
                                <option value="Article Writing">Article Writing</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Business Idea">Business Idea</option>
                            </select>
                        </div>

                        {/* Deadline */}
                        <div className="form-control space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Deadline</label>
                            <div>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-all box-border block"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="form-control md:col-span-2 space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</label>
                            <textarea
                                {...register("description", { required: true })}
                                placeholder="Describe your contest in detail..."
                                className="w-full px-4 py-3 h-32 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-all resize-none"
                            ></textarea>
                        </div>

                        {/* Instruction */}
                        <div className="form-control md:col-span-2 space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Detailed Task Instructions</label>
                            <textarea
                                {...register("instruction", { required: true })}
                                placeholder="Step by step instructions for participants..."
                                className="w-full px-4 py-3 h-32 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-all resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <button className="btn w-full mt-8 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white border-none py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                        🚀 Launch Contest
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddContest;
