import Banner from "./Banner";
import PopularContests from "./PopularContests";
import WinnerSection from "./WinnerSection";
import BestCreators from "./BestCreators";

const Home = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            {/* Banner Section with Search */}
            <Banner />

            {/* Main Content Container */}
            <div className="space-y-12 pb-20">
                {/* Popular Contests Section */}
                <PopularContests />

                {/* Motivation/Winner Section */}
                <WinnerSection />

                {/* Extra Static Section: Best Creators */}
                <BestCreators />
            </div>
        </div>
    );
};

export default Home;
