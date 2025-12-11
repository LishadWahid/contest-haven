import Banner from "./Banner";
import PopularContests from "./PopularContests";
import WinnerSection from "./WinnerSection";
import BestCreators from "./BestCreators";
import Container from "../../components/Shared/Container";

const Home = () => {
    return (
        <div className="mx-20 min-h-screen transition-colors duration-300">
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
