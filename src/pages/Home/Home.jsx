import Banner from "./Banner";
import PopularContests from "./PopularContests";
import WinnerSection from "./WinnerSection";
import Reviews from "./Reviews";
import BestCreators from "./BestCreators";


const Home = () => {
    return (
        <div className="mx-auto px-4 md:px-8 lg:px-12 min-h-screen transition-colors duration-300">
            {/* Banner Section with Search */}
            <Banner />

            {/* Main Content Container */}
            <div className="space-y-12 pb-20">
                {/* Popular Contests Section */}
                <PopularContests />

                {/* Motivation/Winner Section */}
                <WinnerSection />

                {/* Reviews Section */}
                <Reviews />

                {/* Extra Static Section: Best Creators */}
                <BestCreators />
            </div>
        </div>
    );
};

export default Home;
