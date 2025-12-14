import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCreator from "../hooks/useCreator";

const CreatorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isCreator, isCreatorLoading] = useCreator();
    const location = useLocation();

    if (loading || isCreatorLoading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>
    }

    if (user && isCreator) {
        return children;
    }

    return <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>
};

export default CreatorRoute;
