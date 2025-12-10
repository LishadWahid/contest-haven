import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('Login Successful! 🎉');
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message);
            })
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                // Can create user in backend here if not exists
                toast.success('Google Login Successful! 🎉');
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message);
            })
    }

    return (
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
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">Welcome Back</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Login to your account</p>
                    </motion.div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        {/* Email Input */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
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
                            transition={{ delay: 0.4 }}
                            className="form-control"
                        >
                            <div className="flex items-center gap-3">
                                <label className="label w-24 justify-start py-0">
                                    <span className="label-text dark:text-gray-300 text-sm font-medium">Password:</span>
                                </label>
                                <div className="flex-1">
                                    <input
                                        type="password"
                                        {...register("password", { required: true })}
                                        placeholder="Enter your password"
                                        className="input input-sm input-bordered w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    />
                                    {errors.password && <span className="text-red-500 text-xs mt-1 block">Password is required</span>}
                                </div>
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="form-control mt-4"
                        >
                            <button
                                type="submit"
                                className="btn btn-sm btn-primary text-white w-full"
                            >
                                Login
                            </button>
                        </motion.div>
                    </form>

                    {/* Divider */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="divider text-gray-600 dark:text-gray-400 text-xs my-3"
                    >
                        OR
                    </motion.div>

                    {/* Google Sign In Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-center"
                    >
                        <button
                            onClick={handleGoogleSignIn}
                            className="btn btn-sm btn-outline dark:text-gray-300 dark:border-gray-600 hover:bg-primary hover:text-white w-full gap-2"
                        >
                            <FcGoogle className="text-xl" />
                            Continue with Google
                        </button>
                    </motion.div>

                    {/* Sign Up Link */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-center mt-3 text-sm text-gray-600 dark:text-gray-400"
                    >
                        New Here?{' '}
                        <Link to="/signup" className="text-primary font-semibold hover:underline">
                            Create an account
                        </Link>
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
