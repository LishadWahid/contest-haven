import React, { useState } from 'react';

const FAQ = () => {
    const faqs = [
        {
            question: "How do I join a contest?",
            answer: "Simply browse the 'All Contests' page, click on a contest you like, and proceed to pay the entry fee. Once paid, you are registered!"
        },
        {
            question: "Is my payment secure?",
            answer: "Yes, we use Stripe for all transactions, ensuring industry-standard security for your payments."
        },
        {
            question: "Can I participate in multiple contests?",
            answer: "Absolutely! You can participate in as many contests as you like, provided they are active."
        },
        {
            question: "How are winners selected?",
            answer: "The Contest Creator reviews all submissions after the deadline and selects the winner based on the quality of work."
        },
        {
            question: "What happens if I win?",
            answer: "If you win, your name and photo will be displayed on the contest page and the Winner's Leaderboard. The prize mechanism is handled by the creator."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600 dark:text-gray-400">Find answers to common questions about ContestHub.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
                            <button
                                className="w-full px-6 py-4 text-left flex justify-between items-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="font-bold text-lg text-gray-900 dark:text-white">{faq.question}</span>
                                <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </span>
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="px-6 pb-6 pt-2 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
