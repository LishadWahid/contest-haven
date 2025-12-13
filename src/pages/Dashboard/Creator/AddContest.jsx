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
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Add New Contest</h2>
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Contest Name */}
                        <div className="form-control">
                            <label className="label font-medium text-gray-700 dark:text-gray-300">
                                Contest Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Logo Design Challenge"
                                {...register("name", { required: true })}
                                className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Image URL */}
                        <div className="form-control">
                            <label className="label font-medium text-gray-700 dark:text-gray-300">
                                Image URL
                            </label>
                            <input
                                type="text"
                                placeholder="https://example.com/image.jpg"
                                {...register("image", { required: true })}
                                className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Contest Price */}
                        <div className="form-control">
                            <label className="label font-medium text-gray-700 dark:text-gray-300">
                                Entry Price ($)
                            </label>
                            <input
                                type="number"
                                placeholder="0.00"
                                step="0.01"
                                {...register("price", { required: true })}
                                className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Prize Money */}
                        <div className="form-control">
                            <label className="label font-medium text-gray-700 dark:text-gray-300">
                                Prize Money
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., $500 + Certificate"
                                {...register("prize", { required: true })}
                                className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Contest Type */}
                        <div className="form-control">
                            <label className="label font-medium text-gray-700 dark:text-gray-300">
                                Contest Type
                            </label>
                            <select
                                defaultValue="default"
                                {...register("type", { required: true })}
                                className="select select-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                            >
                                <option disabled value="default">Select a type</option>
                                <option value="Image Design">Image Design</option>
                                <option value="Article Writing">Article Writing</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Business Idea">Business Idea</option>
                            </select>
                        </div>

                        {/* Deadline */}
                        <div className="form-control">
                            <label className="label font-medium text-gray-700 dark:text-gray-300">
                                Deadline
                            </label>
                            <div className="w-full">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    wrapperClassName="w-full"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="form-control md:col-span-2">
                            <label className="label font-medium text-gray-700 dark:text-gray-300">
                                Description
                            </label>
                            <textarea
                                placeholder="Describe your contest in detail..."
                                {...register("description", { required: true })}
                                className="textarea textarea-bordered h-32 w-full focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                            ></textarea>
                        </div>

                        {/* Task Instruction */}
                        <div className="form-control md:col-span-2">
                            <label className="label font-medium text-gray-700 dark:text-gray-300">
                                Task Instruction
                            </label>
                            <textarea
                                placeholder="Specific instructions for participants..."
                                {...register("instruction", { required: true })}
                                className="textarea textarea-bordered h-32 w-full focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            className="btn btn-primary px-8 py-3 text-white font-bold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            Add Contest
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddContest;
