import React from 'react';

const HowItWorks = () => {
    return (
        <div className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                        How ContestHub Works
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Your journey to winning exciting prizes starts here. Follow these simple steps to participate and showcase your talent.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {/* Step 1 */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 text-2xl font-bold text-blue-600 dark:text-blue-400">1</div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Sign Up & Discover</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Create an account and explore a wide range of contests from design to writing. Filter by category to find your perfect match.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6 text-2xl font-bold text-purple-600 dark:text-purple-400">2</div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Register & Pay</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Choose a contest and pay the entry fee securely via Stripe. Once registered, you unlock the task submission area.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-6 text-2xl font-bold text-orange-600 dark:text-orange-400">3</div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Submit & Win</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Submit your work before the deadline. Wait for the creator to declare the winner and celebrate your victory on the leaderboard!
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <a href="/all-contests" className="inline-block px-8 py-4 text-lg font-bold text-white transition-transform transform bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:scale-105 hover:shadow-2xl">
                        Start competing Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
