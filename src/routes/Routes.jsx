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
import AdminRoute from "./AdminRoute";
import CreatorRoute from "./CreatorRoute";
import HowItWorks from "../pages/Extra/HowItWorks";
import FAQ from "../pages/Extra/FAQ";
import About from "../pages/Extra/About";

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
      { path: "/how-it-works", element: <HowItWorks /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/about", element: <About /> },
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

  // Dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },

      // USER ROUTES
      { path: "participated", element: <ParticipatedContests /> },
      { path: "winnings", element: <WinningContests /> },
      { path: "profile", element: <UserProfile /> },

      // CREATOR ROUTES
      {
        path: "add-contest",
        element: <CreatorRoute><AddContest /></CreatorRoute>
      },
      {
        path: "my-contests",
        element: <CreatorRoute><MyCreatedContests /></CreatorRoute>
      },
      {
        path: "submissions/:id",
        element: <CreatorRoute><SubmissionsPage /></CreatorRoute>
      },
      {
        path: "edit-contest/:id",
        element: <CreatorRoute><EditContest /></CreatorRoute>
      },

      // ADMIN ROUTES
      {
        path: "manage-users",
        element: <AdminRoute><ManageUsers /></AdminRoute>
      },
      {
        path: "manage-contests",
        element: <AdminRoute><ManageContests /></AdminRoute>
      },
    ],
  },
]);
