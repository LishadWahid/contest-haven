import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';

const ParticipatedContests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    })

    return (
        <div className="space-y-6">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-700 dark:via-pink-700 dark:to-red-700 rounded-2xl p-8 shadow-xl">
                <h2 className="text-4xl font-bold text-white mb-2">My Participated Contests</h2>
                <p className="text-white/90 text-lg">Total Participations: <span className="font-bold">{payments.length}</span></p>
            </div>

            {/* Table Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700">
                            <tr>
                                <th className="text-white font-semibold">#</th>
                                <th className="text-white font-semibold">Contest Details</th>
                                <th className="text-white font-semibold text-center">Deadline</th>
                                <th className="text-white font-semibold text-center">Status</th>
                                <th className="text-white font-semibold text-right">Transaction ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment._id} className="hover:bg-purple-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-200 dark:border-gray-700">
                                    <th className="text-gray-900 dark:text-gray-100 font-bold">{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-16 h-16 ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-gray-800">
                                                    <img src={payment.image} alt={payment.contestName} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 dark:text-white text-lg">{payment.contestName}</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    Entry Fee: <span className="font-semibold text-green-600 dark:text-green-400">${payment.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="font-semibold text-gray-900 dark:text-white">
                                            {new Date(payment.deadline).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </div>
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${new Date(payment.deadline) > new Date()
                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                            }`}>
                                            {new Date(payment.deadline) > new Date() ? '🔔 Upcoming' : '✓ Ended'}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 font-semibold text-sm">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Paid
                                        </span>
                                    </td>
                                    <td className="text-right">
                                        <code className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded font-mono">
                                            {payment.transactionId}
                                        </code>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {payments.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                            <svg className="w-10 h-10 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Participations Yet</h3>
                        <p className="text-gray-600 dark:text-gray-400">Start participating in contests to see them here!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ParticipatedContests;
