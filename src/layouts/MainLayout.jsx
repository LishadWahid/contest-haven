import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div className='w-full mx-auto px-4 md:px-8'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
