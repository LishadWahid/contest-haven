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

    if (isLoading) return <progress className="progress w-56"></progress>

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Edit Contest</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Similar fields to AddContest but with defaultValue */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">Contest Name</label>
                        <input type="text" defaultValue={contest.name} {...register("name")} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">Price</label>
                        <input type="number" defaultValue={contest.price} {...register("price")} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">Prize</label>
                        <input type="text" defaultValue={contest.prize} {...register("prize")} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">Type</label>
                        <select defaultValue={contest.type} {...register("type")} className="select select-bordered">
                            <option value="Image Design">Image Design</option>
                            <option value="Article Writing">Article Writing</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Business Idea">Business Idea</option>
                        </select>
                    </div>
                    <div className="form-control md:col-span-2">
                        <label className="label">Description</label>
                        <textarea defaultValue={contest.description} {...register("description")} className="textarea textarea-bordered h-24"></textarea>
                    </div>
                    <div className="form-control md:col-span-2">
                        <label className="label">Instruction</label>
                        <textarea defaultValue={contest.instruction} {...register("instruction")} className="textarea textarea-bordered h-24"></textarea>
                    </div>
                </div>
                <button className="btn btn-primary mt-6">Update Contest</button>
            </form>
        </div>
    );
};

export default EditContest;
