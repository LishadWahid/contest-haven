import { useState, useEffect } from "react";
import { FaArrowRight, FaUserAstronaut } from "react-icons/fa";
import { Link } from "react-router-dom";

const FeatureGrid = () => {
    const [count, setCount] = useState(1);

    useEffect(() => {
        const duration = 2000; // 2 seconds animation
        const target = 50;
        const intervalTime = duration / target;

        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev >= target) {
                    clearInterval(timer);
                    return target;
                }
                return prev + 1;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full mx-auto px-4 md:px-8 lg:px-12 py-20 font-sans relative">
            {/* Background Decorative Circle */}
            {/* Background Decorative Animation */}
            <div className="hidden lg:block absolute -right-64 -top-32 z-[-1] overflow-visible">
                {/* Large Pulsing Ring */}
                <div className="w-[500px] h-[500px] bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur-[100px] opacity-30 animate-pulse absolute top-0 right-0"></div>
                {/* Floating Colorful Blob */}
                <div className="w-96 h-96 bg-gradient-to-br from-pink-500 to-orange-400 rounded-full blur-[80px] opacity-40 absolute top-20 right-20 animate-bounce duration-[3000ms]"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 rounded-3xl overflow-hidden shadow-2xl">

                {/* Block 1: Stats & CTA */}
                <div className="bg-orange-500 p-12 flex flex-col justify-center items-center text-center text-white min-h-[350px] relative group overflow-hidden">
                    <div className="absolute inset-0 bg-black/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full opacity-20"></div>

                    <h2 className="text-6xl font-extrabold mb-2 relative z-10 flex items-center">
                        {count}k+
                    </h2>
                    <h3 className="text-2xl font-semibold mb-8 relative z-10 leading-snug">
                        Creative Challenges <br /> & Contests Completed
                    </h3>

                    <Link to="/all-contests">
                        <button className="bg-white text-orange-600 px-8 py-3 rounded font-bold uppercase tracking-wider text-xs hover:bg-gray-100 transition-colors flex items-center gap-2 relative z-10">
                            Explore Now <FaArrowRight />
                        </button>
                    </Link>
                </div>

                {/* Block 2: Image */}
                <div className="relative min-h-[350px]">
                    <img
                        src="https://img.freepik.com/free-photo/top-view-illustrator-working-with-tablet_23-2150040103.jpg"
                        alt="Creative Work"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors duration-500"></div>
                </div>

                {/* Block 3: Expert Talent */}
                <div className="bg-orange-500 p-12 flex flex-col justify-center items-center text-center text-white min-h-[350px] relative group overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>

                    <div className="mb-6 relative z-10">
                        <FaUserAstronaut className="text-6xl text-white/90" />
                    </div>

                    <h3 className="text-2xl font-semibold mb-8 relative z-10 leading-snug">
                        World-Class Designers <br /> Ready to Collaborate
                    </h3>

                    <Link to="/leaderboard">
                        <button className="bg-white text-orange-600 px-8 py-3 rounded font-bold uppercase tracking-wider text-xs hover:bg-gray-100 transition-colors flex items-center gap-2 relative z-10">
                            Find Experts
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default FeatureGrid;
