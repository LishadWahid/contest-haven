import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const BestCreators = () => {
    const creators = [
        {
            id: 1,
            name: "Alex Morgan",
            image: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
            role: "Designer",
        },
        {
            id: 2,
            name: "Sarah Jenkins",
            image: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater_273609-17368.jpg",
            role: "Copywriter",
        },
        {
            id: 3,
            name: "Michael Chen",
            image: "https://img.freepik.com/free-photo/handsome-young-man-with-arms-crossed_23-2148222620.jpg",
            role: "Developer",
        },
        {
            id: 4,
            name: "Emily Davis",
            image: "https://img.freepik.com/free-photo/portrait-young-happy-woman-smiling-camera_23-2147892187.jpg",
            role: "Photographer",
        },
        {
            id: 5,
            name: "Chris Wilson",
            image: "https://img.freepik.com/free-photo/mand-holding-cup_1258-340.jpg",
            role: "Artist",
        },
        {
            id: 6,
            name: "David Kim",
            image: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
            role: "Motion Designer",
        },
        {
            id: 7,
            name: "Lisa Wang",
            image: "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg",
            role: "Illustrator",
        },
        {
            id: 8,
            name: "James Carter",
            image: "https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg",
            role: "Videographer",
        },
        {
            id: 9,
            name: "Nina Patel",
            image: "https://img.freepik.com/free-photo/portrait-beautiful-woman-smiling_23-2148222610.jpg",
            role: "UI/UX Designer",
        }
    ];

    return (
        <div className="my-16 w-full mx-auto px-4 font-sans">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent uppercase tracking-wider mb-2 drop-shadow-sm">
                    Our Top Creators
                </h2>
                <div className="flex justify-center items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                    <span className="w-16 h-1 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full"></span>
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                </div>
            </div>

            {/* Creators Carousel */}
            <Swiper
                slidesPerView={2}
                spaceBetween={20}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 40,
                    },
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper py-10 px-4"
            >
                {creators.map((creator, index) => (
                    <SwiperSlide key={creator.id}>
                        <div className="group flex flex-col items-center cursor-pointer transition-transform hover:-translate-y-2 pb-10">
                            {/* Image Container with Gradient Border */}
                            <div className="relative mb-4">
                                <div className={`absolute -inset-1 bg-gradient-to-r ${index % 2 === 0 ? 'from-pink-600 to-purple-600' : 'from-blue-600 to-teal-600'} rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500`}></div>
                                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                                    <img
                                        src={creator.image}
                                        alt={creator.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            </div>

                            {/* Text */}
                            <h3 className={`text-lg font-bold bg-gradient-to-r ${index % 2 === 0 ? 'from-pink-600 to-purple-600' : 'from-blue-600 to-teal-600'} bg-clip-text text-transparent transition-colors tracking-wide text-center`}>
                                {creator.name}
                            </h3>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1 text-center">
                                {creator.role}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BestCreators;
