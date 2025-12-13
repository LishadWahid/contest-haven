import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import AllContests from "../pages/AllContests/AllContests";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ContestDetails from "../pages/ContestDetails/ContestDetails";
import Payment from "../pages/Payment/Payment";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import PrivateRoute from "./PrivateRoute";

// Dashboard
import DashboardLayout from "../layouts/DashboardLayout";
import ParticipatedContests from "../pages/Dashboard/User/ParticipatedContests";
import WinningContests from "../pages/Dashboard/User/WinningContests";
import UserProfile from "../pages/Dashboard/User/UserProfile";
import AddContest from "../pages/Dashboard/Creator/AddContest";
import MyCreatedContests from "../pages/Dashboard/Creator/MyCreatedContests";
import SubmissionsPage from "../pages/Dashboard/Creator/SubmissionsPage";
import EditContest from "../pages/Dashboard/Creator/EditContest";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageContests from "../pages/Dashboard/Admin/ManageContests";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import CreatorDashboard from "../pages/Dashboard/Creator/CreatorDashboard";
import UserDashboard from "../pages/Dashboard/User/UserDashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-contests", element: <AllContests /> },
      { path: "/leaderboard", element: <Leaderboard /> },
      {
        path: "/contest/:id",
        element: (
          <PrivateRoute>
            <ContestDetails />
          </PrivateRoute>
        )
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        )
      }
    ],
  },

  // Auth
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },

  // Dashboard (PRIVATE)
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Index route for Dashboard (redirects to role-specific home)
      { index: true, element: <DashboardHome /> },

      // USER ROUTES
      { path: "participated", element: <ParticipatedContests /> },
      { path: "winnings", element: <WinningContests /> },
      { path: "profile", element: <UserProfile /> },
      // Optional explicit path for user dashboard
      { path: "user", element: <UserDashboard /> },

      // CREATOR ROUTES
      { path: "creator", element: <CreatorDashboard /> }, // Optional explicit path
      { path: "add-contest", element: <AddContest /> },
      { path: "my-contests", element: <MyCreatedContests /> },
      { path: "submissions/:id", element: <SubmissionsPage /> },
      { path: "edit-contest/:id", element: <EditContest /> },

      // ADMIN ROUTES
      { path: "admin", element: <AdminDashboard /> }, // Optional explicit path
      { path: "manage-users", element: <ManageUsers /> },
      { path: "manage-contests", element: <ManageContests /> },
    ],
  },
]);
