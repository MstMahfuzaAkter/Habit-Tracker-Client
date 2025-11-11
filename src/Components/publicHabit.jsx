import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LoadingSpinner from "../pages/LoadingSpinner/LoadingSpinner";


const PublicHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://habit-tracker-server-coral.vercel.app/latest-habit")
      .then((res) => res.json())
      .then((data) => {
        setHabits(data);
        setLoading(false); 
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (habitId) => {
    const isLoggedIn = localStorage.getItem("token"); 
    if (!isLoggedIn) {
      navigate("/auth/login"); 
    } else {
      navigate(`/habit/${habitId}`); 
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Browse Public Habits</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map((habit) => (
          <div
            key={habit._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold mb-2">{habit.title}</h2>
            <p className="text-gray-600 mb-4">{habit.description.slice(0, 100)}...</p>
            <p className="text-sm text-gray-500 mb-4">Creator: {habit.userName}</p>
            <button
              onClick={() => handleViewDetails(habit._id)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded hover:from-blue-600 hover:to-cyan-600 transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicHabits;
