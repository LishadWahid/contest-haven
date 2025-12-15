import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Project = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const accordions = [
        {
            title: "How to participate in contests?",
            content: "Simply browse our active contests, choose one that fits your skills, and click 'Join Now'. Follow the submission guidelines and upload your entry before the deadline."
        },
        {
            title: "Is my payment information secure?",
            content: "Yes, we use Stripe for all transactions, ensuring 100% secure and encrypted payment processing for both contest hosts and participants."
        },
        {
            title: "Can I host a contest for free?",
            content: "Contest hosting requires a robust platform. We charge a small service fee to maintain the quality and security of the platform for all users."
        },
        {
            title: "How are winners selected?",
            content: "Winners are selected by the contest organizer based on criteria like creativity, originality, and adherence to the brief. Fair play is our top priority."
        }
    ];

    return (
        <div className="w-full mx-auto px-4 md:px-8 lg:px-12 py-20 font-sans">
            <div className="flex flex-col lg:flex-row gap-10 items-stretch">

                {/* Left Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <p className="text-[#7c3aed] font-bold tracking-widest text-sm mb-4 uppercase">
                        ::: Why Choose Us
                    </p>
                    <h2 className="text-4xl md:text-5xl font-extrabold 
               text-gray-900 dark:text-gray-400 
               mb-10 leading-tight">
                        The Best Platform for <br />
                        <span className="text-[#7c3aed]">Creative Battles</span>
                    </h2>

                    <div className="space-y-4">
                        {accordions.map((item, index) => (
                            <div
                                key={index}
                                className={`transition-all duration-300 ease-in-out border-l-4 ${openIndex === index ? 'text-[#7c3aed] bg-gray-50 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'} shadow-sm`}
                            >
                                <button
                                    onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                                >
                                    <span className={`text-lg font-bold ${openIndex === index ? 'text-[#7c3aed]' : 'text-gray-700 dark:text-gray-200'}`}>
                                        {`0${index + 1}. ${item.title}`}
                                    </span>
                                    <span className={`p-2 rounded-sm ${openIndex === index ? 'text-[#7c3aed] text-blue' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                                        {openIndex === index ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                                    </span>
                                </button>

                                <div
                                    className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${openIndex === index ? 'max-h-40' : 'max-h-0'}`}
                                >
                                    <p className="p-5 pt-0 text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Image Section */}
                <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full">
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                        <img
                            src="https://img.freepik.com/free-photo/diverse-business-people-stacking-hands_53876-25257.jpg"
                            alt="Teamwork"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>

                    {/* Floating Vertical Text */}
                    <div className="hidden lg:flex absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
                        <span className="text-gray-300 dark:text-gray-600 font-bold tracking-[0.3em] text-xs uppercase whitespace-nowrap">
                            WHY CHOOSE US
                        </span>
                    </div>

                    {/* Decorative Box */}
                    <div className="absolute bottom-10 right-10 text-[#7c3aed] p-6 rounded text-blue shadow-xl hidden md:block">
                        <div className="text-3xl font-bold mb-1">100%</div>
                        <div className="text-xs uppercase tracking-wider opacity-90">Trusted Platform</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Project;
