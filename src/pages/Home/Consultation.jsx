import { FaCheckCircle } from "react-icons/fa";

const Consultation = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-20 font-sans">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                {/* Left Content */}
                <div className="w-full lg:w-1/2">
                    <p className="text-orange-500 font-bold tracking-widest text-sm mb-4 uppercase">
                        ::: Contact With Us
                    </p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                        Book your <span className="text-orange-500">consultation</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                        Have questions about hosting a contest or joining one? Our experts are here to guide you through the process and ensure your success on our platform.
                    </p>

                    <ul className="space-y-4 mb-10">
                        {[
                            "Get expert advice on contest strategies",
                            "Understand our secure payment protection",
                            "Maximize your participation and winnings"
                        ].map((item, index) => (
                            <li key={index} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
                                <FaCheckCircle className="text-orange-500 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    {/* Profile Section */}
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-orange-500 p-0.5">
                            <img
                                src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater_273609-17368.jpg"
                                alt="Aleesha Brown"
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">Aleesha Brown</h4>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">CEO & CO Founder</p>
                        </div>
                    </div>
                </div>

                {/* Right Form Section */}
                <div className="w-full lg:w-1/2 relative">
                    {/* Decorative Background Dots/Pattern could go here */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-dots-pattern opacity-20 hidden lg:block"></div>

                    <div className="bg-[#111] text-white p-8 md:p-10 rounded-lg shadow-2xl relative z-10">
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full bg-white text-gray-900 px-4 py-3 rounded outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-white text-gray-900 px-4 py-3 rounded outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                            />
                            <input
                                type="text"
                                placeholder="Subject"
                                className="w-full bg-white text-gray-900 px-4 py-3 rounded outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                            />
                            <textarea
                                placeholder="Message"
                                rows="4"
                                className="w-full bg-white text-gray-900 px-4 py-3 rounded outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                            ></textarea>

                            <button className="w-full bg-orange-500 text-white font-bold py-3 rounded hover:bg-orange-600 transition-colors uppercase tracking-wide">
                                Send a Message
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Consultation;
