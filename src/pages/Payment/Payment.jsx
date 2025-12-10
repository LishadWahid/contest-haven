import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams, Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrophy, FaDollarSign, FaShieldAlt, FaLock, FaCreditCard, FaArrowLeft, FaCheckCircle, FaTag, FaClock } from "react-icons/fa";
import { SiStripe } from "react-icons/si";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: contest = {}, isLoading } = useQuery({
        queryKey: ['contest-payment', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
                <span className="loading loading-spinner loading-lg text-purple-600"></span>
            </div>
        );
    }

    const price = contest?.price || 0;
    const processingFee = (price * 0.029 + 0.30).toFixed(2); // Stripe's typical fee
    const total = (parseFloat(price) + parseFloat(processingFee)).toFixed(2);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to={`/contest/${id}`}
                        className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-semibold group mb-4"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back to Contest Details
                    </Link>
                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        Secure Checkout
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Complete your registration for the contest
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Order Summary */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Contest Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={contest.image}
                                    alt={contest.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                                    <FaTag />
                                    {contest.type}
                                </div>
                            </div>

                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2">
                                    {contest.name}
                                </h2>

                                {/* Contest Info */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                            <FaTrophy className="text-yellow-500" />
                                            Prize Money
                                        </span>
                                        <span className="font-bold text-gray-900 dark:text-white">${contest.prize}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                            <FaClock className="text-red-500" />
                                            Deadline
                                        </span>
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {new Date(contest.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                        <FaDollarSign className="text-green-500" />
                                        Price Breakdown
                                    </h3>

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Entry Fee</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">${price.toFixed(2)}</span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Processing Fee</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">${processingFee}</span>
                                    </div>

                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex items-center justify-between">
                                        <span className="font-bold text-lg text-gray-900 dark:text-white">Total Amount</span>
                                        <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                            ${total}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Badges */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FaShieldAlt className="text-green-500" />
                                Secure Payment
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                    <FaLock className="text-green-500" />
                                    <span>256-bit SSL Encryption</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                    <SiStripe className="text-purple-600 text-lg" />
                                    <span>Powered by Stripe</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                    <FaCheckCircle className="text-green-500" />
                                    <span>PCI DSS Compliant</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Payment Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                            <div className="mb-6">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                                    <FaCreditCard className="text-purple-600" />
                                    Payment Information
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Enter your card details to complete the registration
                                </p>
                            </div>

                            <Elements stripe={stripePromise}>
                                <CheckoutForm contest={contest} total={total} />
                            </Elements>

                            {/* Trust Indicators */}
                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <FaLock className="text-green-500" />
                                        <span>Secure Payment</span>
                                    </div>
                                    <span className="hidden sm:inline">•</span>
                                    <div className="flex items-center gap-2">
                                        <FaShieldAlt className="text-blue-500" />
                                        <span>Money-back Guarantee</span>
                                    </div>
                                    <span className="hidden sm:inline">•</span>
                                    <div className="flex items-center gap-2">
                                        <FaCheckCircle className="text-purple-500" />
                                        <span>Instant Confirmation</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* What Happens Next */}
                        <div className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-6 border border-purple-200 dark:border-purple-800">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FaCheckCircle className="text-purple-600" />
                                What Happens Next?
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 font-bold">1.</span>
                                    <span>You'll receive an instant confirmation email</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 font-bold">2.</span>
                                    <span>Access contest details in your dashboard</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 font-bold">3.</span>
                                    <span>Submit your entry before the deadline</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 font-bold">4.</span>
                                    <span>Winners will be announced after judging</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
