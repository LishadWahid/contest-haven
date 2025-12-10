import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaExclamationCircle, FaSpinner, FaCreditCard } from "react-icons/fa";

const CheckoutForm = ({ contest, total }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const price = contest?.price || 0;

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/payments/create-payment-intent', { price: price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => {
                    console.error('Error creating payment intent:', err);
                    setError('Failed to initialize payment. Please try again.');
                });
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        setProcessing(true);
        setError('');

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('payment error', error);
            setError(error.message);
            setProcessing(false);
            return;
        } else {
            console.log('payment method', paymentMethod);
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log('confirm error', confirmError);
            setError(confirmError.message);
            setProcessing(false);
        } else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // save the payment in the database
                const payment = {
                    userEmail: user.email,
                    userName: user.displayName,
                    price: price,
                    amount: price,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    contestId: contest._id,
                    contestName: contest.name,
                    status: 'pending'
                };

                try {
                    const res = await axiosSecure.post('/payments', payment);
                    console.log('payment saved', res.data);
                    if (res.data?.insertedId || res.data?._id) {
                        toast.success('🎉 Payment successful! Redirecting to dashboard...');
                        // Immediate redirect - no delay
                        navigate('/dashboard/participated');
                    } else {
                        setError('Payment succeeded but registration failed. Please contact support.');
                        setProcessing(false);
                    }
                } catch (err) {
                    console.error('Error saving payment:', err);
                    setError('Payment succeeded but failed to save. Please contact support with transaction ID: ' + paymentIntent.id);
                    setProcessing(false);
                }
            }
        }
    };

    const CARD_ELEMENT_OPTIONS = {
        style: {
            base: {
                fontSize: '16px',
                color: '#1f2937',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSmoothing: 'antialiased',
                '::placeholder': {
                    color: '#9ca3af',
                },
                iconColor: '#8b5cf6',
            },
            invalid: {
                color: '#ef4444',
                iconColor: '#ef4444',
            },
        },
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card Input */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Card Information
                </label>
                <div className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus-within:border-purple-500 dark:focus-within:border-purple-400 transition-colors bg-white dark:bg-gray-700">
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <FaCreditCard className="text-purple-500" />
                    Your payment information is secure and encrypted
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <FaExclamationCircle className="text-red-600 dark:text-red-400 text-xl flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-semibold text-red-800 dark:text-red-300 mb-1">Payment Error</h4>
                        <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                    </div>
                </div>
            )}

            {/* Success Message */}
            {transactionId && (
                <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                    <FaCheckCircle className="text-green-600 dark:text-green-400 text-xl flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-semibold text-green-800 dark:text-green-300 mb-1">Payment Successful!</h4>
                        <p className="text-sm text-green-700 dark:text-green-400">
                            Transaction ID: <span className="font-mono font-semibold">{transactionId}</span>
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                            Redirecting to your dashboard...
                        </p>
                    </div>
                </div>
            )}

            {/* Submit Button */}
            <button
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${!stripe || !clientSecret || processing
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                    }`}
                type="submit"
                disabled={!stripe || !clientSecret || processing}
            >
                {processing ? (
                    <>
                        <FaSpinner className="animate-spin text-xl" />
                        Processing Payment...
                    </>
                ) : (
                    <>
                        <FaCreditCard className="text-xl" />
                        Pay ${total || price.toFixed(2)}
                    </>
                )}
            </button>

            {/* Test Card Info (for development) */}
            {import.meta.env.DEV && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 text-sm">
                        Test Card (Development Only)
                    </h4>
                    <p className="text-xs text-blue-700 dark:text-blue-400 font-mono">
                        Card: 4242 4242 4242 4242 | Exp: Any future date | CVC: Any 3 digits
                    </p>
                </div>
            )}
        </form>
    );
};

export default CheckoutForm;
