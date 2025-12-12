import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [selectedFileSize, setSelectedFileSize] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                return;
            }
            // Validate file size (max 2MB for base64)
            if (file.size > 2 * 1024 * 1024) {
                toast.error('Image size should be less than 2MB');
                return;
            }

            // Set file info
            setSelectedFile(file);
            setSelectedFileName(file.name);
            setSelectedFileSize(`${(file.size / 1024).toFixed(2)} KB`);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedFile(null);
            setImagePreview(null);
            setSelectedFileName('');
            setSelectedFileSize('');
        }
    };

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const onSubmit = async (data) => {
        console.log('Form submitted with data:', data);

        if (!selectedFile) {
            toast.error('Please select a profile photo');
            return;
        }

        setUploading(true);
        console.log('Starting signup process...');

        try {
            // Convert image to base64
            console.log('Converting image to base64...');
            const photoBase64 = await convertImageToBase64(selectedFile);
            console.log('Image converted successfully');

            // Create user with Firebase Auth
            console.log('Creating user with Firebase Auth...');
            const result = await createUser(data.email, data.password);
            const loggedUser = result.user;
            console.log('Firebase user created:', loggedUser.email);

            // Update user profile with a default avatar (Firebase doesn't support base64 in profile)
            console.log('Updating user profile...');
            await updateUserProfile(data.name, 'https://i.ibb.co/2P8ZW8y/default-avatar.png');
            console.log('Profile updated successfully');

            // Create user entry in database with base64 image
            const userInfo = {
                name: data.name,
                email: data.email,
                photo: photoBase64, // Store base64 image in database
                address: '',
                role: 'user',
                winsCount: 0,
                createdAt: new Date()
            };

            console.log('Saving user to database...');
            const res = await axiosPublic.post('/users', userInfo);
            console.log('Database response:', res.data);

            if (res.data.insertedId) {
                console.log('User added to database successfully');
                reset();
                setSelectedFile(null);
                setImagePreview(null);
                setSelectedFileName('');
                setSelectedFileSize('');
                toast.success('Account Created Successfully! 🎉');
                navigate('/');
            } else {
                toast.error('Failed to save user to database');
                console.error('No insertedId in response');
            }
        } catch (error) {
            console.error('Signup error:', error);

            // More specific error messages
            if (error.code?.includes('auth')) {
                toast.error(`Firebase Error: ${error.message}`);
            } else if (error.response) {
                toast.error(`Server Error: ${error.response.data?.message || error.message}`);
            } else {
                toast.error(error.message || 'Registration failed');
            }
        } finally {
            setUploading(false);
            console.log('Signup process completed');
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-base-200 dark:bg-gray-900 py-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="card w-full max-w-lg shadow-2xl bg-base-100 dark:bg-gray-800"
                >
                    <div className="card-body">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-center mb-4"
                        >
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">Sign Up</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Create your account</p>
                        </motion.div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                            {/* Name Input */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="form-control"
                            >
                                <div className="flex items-center gap-3">
                                    <label className="label w-24 justify-start py-0">
                                        <span className="label-text dark:text-gray-300 text-sm font-medium">Name:</span>
                                    </label>
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            {...register("name", { required: true })}
                                            placeholder="Enter your name"
                                            className="input input-sm input-bordered w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        />
                                        {errors.name && <span className="text-red-500 text-xs mt-1 block">Name is required</span>}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Photo Upload */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="form-control"
                            >
                                <div className="flex items-center gap-3">
                                    <label className="label w-24 justify-start py-0">
                                        <span className="label-text dark:text-gray-300 text-sm font-medium">Photo:</span>
                                    </label>
                                    <div className="flex-1">
                                        <div className="flex gap-2">
                                            <input
                                                type="file"
                                                {...register("photo", { required: true })}
                                                onChange={handleImageChange}
                                                accept="image/*"
                                                className="hidden"
                                                id="photo-upload"
                                            />
                                            <label
                                                htmlFor="photo-upload"
                                                className="btn btn-sm btn-outline dark:text-gray-300 dark:border-gray-600 hover:bg-primary hover:text-white cursor-pointer flex-shrink-0"
                                            >
                                                <FaCloudUploadAlt />
                                                Choose
                                            </label>
                                            <div className="flex-1 flex items-center px-3 py-1 bg-base-200 dark:bg-gray-700 rounded-lg border border-base-300 dark:border-gray-600">
                                                <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                                    {selectedFileName || 'No file chosen'}
                                                </span>
                                            </div>
                                        </div>
                                        {errors.photo && <span className="text-red-500 text-xs mt-1 block">Photo is required</span>}
                                        {imagePreview && (
                                            <div className="mt-2">
                                                <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-full object-cover border-2 border-primary" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Email Input */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="form-control"
                            >
                                <div className="flex items-center gap-3">
                                    <label className="label w-24 justify-start py-0">
                                        <span className="label-text dark:text-gray-300 text-sm font-medium">Email:</span>
                                    </label>
                                    <div className="flex-1">
                                        <input
                                            type="email"
                                            {...register("email", { required: true })}
                                            placeholder="Enter your email"
                                            className="input input-sm input-bordered w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        />
                                        {errors.email && <span className="text-red-500 text-xs mt-1 block">Email is required</span>}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Password Input */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                className="form-control"
                            >
                                <div className="flex items-center gap-3">
                                    <label className="label w-24 justify-start py-0">
                                        <span className="label-text dark:text-gray-300 text-sm font-medium">Password:</span>
                                    </label>
                                    <div className="flex-1">
                                        <input
                                            type="password"
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: { value: 6, message: "Min 6 characters" },
                                                maxLength: { value: 20, message: "Max 20 characters" }
                                            })}
                                            placeholder="Enter your password"
                                            className="input input-sm input-bordered w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        />
                                        {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="form-control mt-4"
                            >
                                <button
                                    type="submit"
                                    className="btn btn-sm btn-primary text-white w-full"
                                    disabled={uploading}
                                >
                                    {uploading ? (
                                        <>
                                            <span className="loading loading-spinner loading-xs"></span>
                                            Creating...
                                        </>
                                    ) : (
                                        'Sign Up'
                                    )}
                                </button>
                            </motion.div>
                        </form>

                        {/* Login Link */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-center mt-3 text-sm text-gray-600 dark:text-gray-400"
                        >
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary font-semibold hover:underline">
                                Login
                            </Link>
                        </motion.p>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </>
    );
};

export default SignUp;
