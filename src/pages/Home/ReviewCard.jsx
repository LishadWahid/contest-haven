import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    const { userName, review: testimonial, user_photoURL, designation } = review;
    return (
        <div className="max-w-sm bg-base-100 dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
            {/* Quote Icon */}
            <FaQuoteLeft className="text-primary text-4xl mb-4 opacity-50" />

            {/* Review Text */}
            <p className="mb-6 text-gray-600 dark:text-gray-300 flex-grow italic leading-relaxed">
                "{testimonial}"
            </p>

            {/* Divider */}
            <div className="border-t border-dashed border-gray-300 dark:border-gray-600 my-4"></div>

            {/* Profile */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900 overflow-hidden">
                    <img
                        src={user_photoURL}
                        alt={userName}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">{userName}</h3>
                    <p className="text-xs text-secondary font-semibold uppercase tracking-wide">{designation || "Participant"}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
