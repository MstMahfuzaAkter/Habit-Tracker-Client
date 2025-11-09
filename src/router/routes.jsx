import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import PrivateRoute from "./PrivateRouter";
import AddHabit from "../pages/AddHabit/AddHabit";
import MyHabits from "../pages/MyHabits/MyHabits";
import BrowsePublicHabits from "../pages/BrowsePublicHabits/BrowsePublicHabits";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Profile from "../Profile/Profile";

export const router = createBrowserRouter([
    {
        path: "/",

        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "add-habit",
                element: <PrivateRoute>
                    <AddHabit></AddHabit>
                </PrivateRoute>
            },
            {
                path: "my-habit",
                element: <PrivateRoute>
                    <MyHabits></MyHabits>
                </PrivateRoute>
            },
            {
                path: "browser-public-habit",
                element: 
                    <BrowsePublicHabits></BrowsePublicHabits>
                
            },
            {
                path: "/auth/login",
                element: <Login />,
            },
            {
                path: "/auth/register",
                element: <Register />,
            }
        ]
    },

]);