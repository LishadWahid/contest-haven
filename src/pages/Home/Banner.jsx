import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const Banner = () => {
    const [search, setSearch] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        "https://img.freepik.com/free-photo/diverse-friends-students-shoot_53876-47012.jpg?t=st=1716298000~exp=1716301600~hmac=xxxxx", // User's Favorite (Team)
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1920&q=80", // Tech / Gaming
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1920&q=80"  // Creative / Writing
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    const handleSearch = (e) => {
        e.preventDefault();
        window.location.href = `/all-contests?search=${search}`;
    }

    return (
        <div className="relative h-[550px] flex items-center justify-center overflow-hidden">
            {/* Background Slider */}
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ${index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        }`}
                    style={{ backgroundImage: `url(${img})` }}
                >
                    <div className="absolute inset-0 bg-gray-900/60"></div>
                </div>
            ))}

            {/* Content - Simple, Centered, Professional */}
            <div className="relative z-10 w-full max-w-4xl px-4 text-center">

                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
                    ContestHub
                </h1>

                <p className="text-lg md:text-2xl text-gray-100 font-light mb-10 max-w-2xl mx-auto">
                    The platform where creativity meets opportunity. <br className="hidden md:block" />
                    Participate, compete, and win amazing prizes.
                </p>

                {/* Clean, Solid Search Bar */}
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center bg-white rounded-lg p-1.5 shadow-2xl max-w-2xl mx-auto transition-transform hover:scale-[1.01]">
                    <div className="flex-1 flex items-center w-full px-4 h-12">
                        <FaSearch className="text-gray-400 mr-3" />
                        <input
                            type="text"
                            className="w-full h-full text-gray-700 bg-transparent outline-none placeholder-gray-400 text-base"
                            placeholder="Search contests (e.g., Logo Design, Writing)..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button className="w-full md:w-auto h-12 px-8 bg-gray-900 hover:bg-black text-white font-medium rounded-md transition-colors duration-200">
                        Search
                    </button>
                </form>

                {/* Minimalist Tags below */}
                <div className="mt-8 flex justify-center gap-6 text-sm font-medium text-gray-300">
                    <span className="opacity-70 uppercase tracking-widest text-xs">Popular:</span>
                    <button onClick={() => window.location.href = '/all-contests?search=Design'} className="hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">Design</button>
                    <button onClick={() => window.location.href = '/all-contests?search=Writing'} className="hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">Writing</button>
                    <button onClick={() => window.location.href = '/all-contests?search=Gaming'} className="hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">Gaming</button>
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentImageIndex
                            ? "bg-white w-8 h-2"
                            : "bg-white/40 w-2 h-2 hover:bg-white/70"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;
