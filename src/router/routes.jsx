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
import FAQ from "../Components/FAQ";
import About from "../Components/About";
import Stat from "../Components/Stat";
import Terms from "../Components/Terms";

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
                path:"/terms",
                element:<Terms></Terms>
            },
            {
                path: "my-habit",
                element: <PrivateRoute>
                    <MyHabits></MyHabits>
                </PrivateRoute>
            },
            {
                path: "/faq",
                element: <FAQ></FAQ>
            },
            {
                path: "/profile",
                element: <Profile></Profile>
            },
            {
                path: "stats",
                element: <Stat></Stat>
            },

            {
                path: "/about",
                element: <About></About>
            },
            {
                path: "browser-public-habit",
                element: <BrowsePublicHabits></BrowsePublicHabits>,
                loader: () => fetch("http://localhost:3000/habit")

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
                loader: ({ params }) => fetch(`http://localhost:3000/habit/${params.id}`)



            },
            {
                path: "/update-habit/:id",
                element: (
                    <PrivateRoute>
                        <UpdateHabit></UpdateHabit>
                    </PrivateRoute>
                ),
                loader: ({ params }) => fetch(`http://localhost:3000/habit/${params.id}`)
            },
        ]
    },

]);