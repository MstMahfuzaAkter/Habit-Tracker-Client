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
import HabitDetails from "../pages/HabitDetails/HabitDetails";
import UpdateHabit from "../pages/UpdateHabit/UpdateHabit";
import NotFound from "../pages/NotFound/NotFound";

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
                path: "*",
                element: <NotFound />
            },
            {
                path: "my-habit",
                element: <PrivateRoute>
                    <MyHabits></MyHabits>
                </PrivateRoute>
            },
            {
                path: "browser-public-habit",
                element: <BrowsePublicHabits></BrowsePublicHabits>,
                loader: () => fetch("https://habit-tracker-server-coral.vercel.app/habit")

            },
            {
                path: "/auth/login",
                element: <Login />,
            },
            {
                path: "/auth/register",
                element: <Register />,
            },
            {
                path: "/habit/:id",
                element: <PrivateRoute><HabitDetails></HabitDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://habit-tracker-server-coral.vercel.app/habit/${params.id}`)



            },
            {
                path: "/update-habit/:id",
                element: (
                    <PrivateRoute>
                        <UpdateHabit></UpdateHabit>
                    </PrivateRoute>
                ),
                loader: ({ params }) => fetch(`https://habit-tracker-server-coral.vercel.app/habit/${params.id}`)
            },
        ]
    },

]);