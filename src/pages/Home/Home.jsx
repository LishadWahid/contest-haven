import Banner from "./Banner";
import PopularContests from "./PopularContests";
import WinnerSection from "./WinnerSection";
import Reviews from "./Reviews";
import BestCreators from "./BestCreators";
import Project from "./Project";
import FeatureGrid from "./FeatureGrid";


const Home = () => {
    return (
        <div className="w-full min-h-screen transition-colors duration-300">
            {/* Banner Section with Search */}
            <Banner />

            {/* Main Content Container */}
            <div className="space-y-12 pb-20">
                {/* Popular Contests Section */}
                <PopularContests />

                {/* Why Choose Us Section */}
                <Project />

                {/* Motivation/Winner Section */}
                <WinnerSection />

                {/* Feature Grid Section */}
                <FeatureGrid />

                {/* Reviews Section */}
                <Reviews />

                {/* Extra Static Section: Best Creators */}
                <BestCreators />
            </div>
        </div>
    );
};

export default Home;
