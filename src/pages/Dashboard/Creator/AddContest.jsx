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
        <div>
            <h2 className="text-3xl font-bold mb-6">Add Contest</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Form fields... */}
                    <div className="form-control">
                        <label className="label">Contest Name</label>
                        <input type="text" {...register("name", { required: true })} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">Image URL</label>
                        <input type="text" {...register("image", { required: true })} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">Contest Price</label>
                        <input type="number" {...register("price", { required: true })} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">Prize Money</label>
                        <input type="text" {...register("prize", { required: true })} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">Contest Type</label>
                        <select defaultValue="default" {...register("type", { required: true })} className="select select-bordered">
                            <option disabled value="default">Select a type</option>
                            <option value="Image Design">Image Design</option>
                            <option value="Article Writing">Article Writing</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Business Idea">Business Idea</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">Deadline</label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="input input-bordered w-full" />
                    </div>
                    <div className="form-control md:col-span-2">
                        <label className="label">Description</label>
                        <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-24"></textarea>
                    </div>
                    <div className="form-control md:col-span-2">
                        <label className="label">Task Instruction</label>
                        <textarea {...register("instruction", { required: true })} className="textarea textarea-bordered h-24"></textarea>
                    </div>
                </div>
                <button className="btn btn-primary mt-6">Add Contest</button>
            </form>
        </div>
    );
};

export default AddContest;
