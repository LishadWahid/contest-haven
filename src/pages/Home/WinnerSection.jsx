import { useRef, useEffect } from "react";
import { FaCrown, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const WinnerSection = () => {
    const scrollRef = useRef(null);

    // Static data representing recent winners
    const winners = [
        {
            name: "Sarah Jenkins",
            contest: "Logo Design 2024",
            prize: "$1000",
            image: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater_273609-17368.jpg",
            rank: 1
        },
        {
            name: "David Miller",
            contest: "Eco Blog Writing",
            prize: "$500",
            image: "https://img.freepik.com/free-photo/handsome-young-man-with-arms-crossed_23-2148222620.jpg",
            rank: 2
        },
        {
            name: "Emma Watson",
            contest: "Portrait Photography",
            prize: "$750",
            image: "https://img.freepik.com/free-photo/portrait-young-happy-woman-smiling-camera_23-2147892187.jpg",
            rank: 3
        },
        {
            name: "James Carter",
            contest: "Mobile App UI",
            prize: "$1200",
            image: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
            rank: 4
        },
        {
            name: "Olivia Brown",
            contest: "Short Story",
            prize: "$300",
            image: "https://img.freepik.com/free-photo/young-woman-with-round-glasses-yellow-sweater_273609-18239.jpg",
            rank: 5
        },
        {
            name: "Lucas Garcia",
            contest: "Digital Art",
            prize: "$850",
            image: "https://img.freepik.com/free-photo/mand-holding-cup_1258-340.jpg",
            rank: 6
        }
    ];

    // Auto Run the carousel
    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

                // If we've reached the end (or close to it), loop back to start
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    // Otherwise scroll right
                    const scrollAmount = clientWidth < 768 ? clientWidth : clientWidth / 3; // Scroll one item width
                    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
                }
            }
        }, 3000); // 3 seconds interval

        return () => clearInterval(interval);
    }, []);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = direction === "left" ? -400 : 400;
            current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="my-24 px-6 w-full mx-auto font-sans relative">
            {/* Header - Centered */}
            <div className="text-center mb-12">
                <span className="text-sm font-bold tracking-widest text-primary uppercase mb-2 block">Hall of Fame</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Recent Champions
                </h2>
                <div className="w-20 h-1.5 bg-yellow-400 mx-auto rounded-full mb-6"></div>
            </div>

            {/* Navigation Buttons - Absolute Positioned Middle */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-white hover:scale-110 transition-transform hidden md:block"
            >
                <FaChevronLeft />
            </button>
            <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-white hover:scale-110 transition-transform hidden md:block"
            >
                <FaChevronRight />
            </button>

            {/* Carousel Container */}
            <div
                className="carousel carousel-center w-full p-4 space-x-6 bg-transparent rounded-box"
                ref={scrollRef}
            >
                {winners.map((winner, idx) => (
                    <div
                        key={idx}
                        className="carousel-item w-full md:w-1/2 lg:w-1/3"
                    >
                        <div className="w-full relative bg-white dark:bg-gray-800 rounded-3xl p-8 text-center shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-2 transition-transform duration-300">

                            {/* Rank Badge */}
                            <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${idx === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                }`}>
                                Rank #{winner.rank}
                            </div>

                            {/* Image */}
                            <div className="relative inline-block mb-6">
                                <div className={`w-32 h-32 rounded-full p-1 mx-auto ${idx < 3 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gray-200 dark:bg-gray-700'
                                    }`}>
                                    <img src={winner.image} alt={winner.name} className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-800" />
                                </div>

                                {/* Crown Icon for Top Winner */}
                                {idx === 0 && (
                                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-2 rounded-full shadow-md">
                                        <FaCrown size={14} />
                                    </div>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{winner.name}</h3>
                            <p className="text-primary font-medium text-sm mb-6 uppercase tracking-wide">{winner.contest}</p>

                            <div className="py-2 px-6 rounded-xl bg-gray-50 dark:bg-gray-700/50 inline-block font-bold text-gray-900 dark:text-white border border-gray-100 dark:border-gray-600">
                                Won <span className="text-green-600 dark:text-green-400">{winner.prize}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WinnerSection;
