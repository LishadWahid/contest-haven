import React from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import ReviewCard from './ReviewCard';

const Reviews = () => {
    // Dummy Data for Preview
    const reviews = [
        {
            id: 1,
            userName: "Sarah Johnson",
            review: "ContestHub transformed how I showcase my design skills. Winning the Logo Championship was a career turning point!",
            user_photoURL: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
            designation: "Graphic Designer"
        },
        {
            id: 2,
            userName: "Michael Chen",
            review: "The platform is incredibly user-friendly and the community is supportive. I love the variety of contests available.",
            user_photoURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
            designation: "Frontend Developer"
        },
        {
            id: 3,
            userName: "Emily Davis",
            review: "As a writer, finding paid opportunities can be tough. ContestHub connects me with serious clients and great challenges.",
            user_photoURL: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
            designation: "Content Writer"
        },
        {
            id: 4,
            userName: "David Wilson",
            review: "Participating in the coding hackathons here sharpened my skills faster than any course I've taken.",
            user_photoURL: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
            designation: "Full Stack Dev"
        },
        {
            id: 5,
            userName: "Lisa Anderson",
            review: "I've won two marketing strategy contests! The prize money is real and the payments are super fast.",
            user_photoURL: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
            designation: "Digital Marketer"
        },
        {
            id: 6,
            userName: "James Martin",
            review: "The 'Live Image' feature for contests is amazing. It really helps to visualize the mood of the challenge.",
            user_photoURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
            designation: "UX Researcher"
        }
    ];

    return (
        <div className='my-24 w-full mx-auto px-4'>
            <div className='text-center mb-16'>
                <h2 className="text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                    What Our Users Say
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                    Global creators and participants trust ContestHub. Hear about their experiences and success stories.
                </p>
            </div>

            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                    slideShadows: false,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper !pb-12"
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
            >
                {
                    reviews.map(review => (
                        <SwiperSlide key={review.id} className="!w-[350px] md:!w-[300px]">
                            <ReviewCard review={review} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </div>
    );
};

export default Reviews;
