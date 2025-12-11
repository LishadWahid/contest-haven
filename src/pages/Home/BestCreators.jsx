import { FaStar } from "react-icons/fa";

const BestCreators = () => {
    const creators = [
        {
            id: 1,
            name: "Alex Morgan",
            role: "Brand Designer",
            image: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
            rating: "4.9",
        },
        {
            id: 2,
            name: "Sarah Jenkins",
            role: "Copywriter",
            image: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater_273609-17368.jpg",
            rating: "5.0",
        },
        {
            id: 3,
            name: "Michael Chen",
            role: "Developer",
            image: "https://img.freepik.com/free-photo/handsome-young-man-with-arms-crossed_23-2148222620.jpg",
            rating: "4.8",
        },
        {
            id: 4,
            name: "Emily Davis",
            role: "Photographer",
            image: "https://img.freepik.com/free-photo/portrait-young-happy-woman-smiling-camera_23-2147892187.jpg",
            rating: "4.9",
        }
    ];

    return (
        <div className="my-24 px-6 w-full mx-auto font-sans">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                    Meet Our Top Creators
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    The talented individuals driving innovation and creativity in our community.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {creators.map((creator) => (
                    <div
                        key={creator.id}
                        className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg group"
                    >
                        <div className="relative w-24 h-24 mx-auto mb-6">
                            <img
                                src={creator.image}
                                alt={creator.name}
                                className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                                    <FaStar size={10} /> {creator.rating}
                                </div>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            {creator.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-6">
                            {creator.role}
                        </p>

                        <button className="w-full py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                            View Profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestCreators;
