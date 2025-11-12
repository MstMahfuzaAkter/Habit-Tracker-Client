import { useLoaderData } from "react-router";
import { useNavigate } from "react-router";
import { useState, useMemo, useContext } from "react";
import toast from "react-hot-toast";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../context/AuthContext";

const BrowsePublicHabits = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleSeeDetails = (habitId) => {
    if (!user) {
      toast.error("Please log in to view habit details!");
      setTimeout(() => navigate("/auth/login"), 1000);
    } else {
      navigate(`/habit/${habitId}`);
    }
  };

  const categories = useMemo(() => {
    const cats = data.map((h) => h.category);
    return ["All", ...new Set(cats)];
  }, [data]);

  const filteredHabits = useMemo(() => {
    return data.filter((habit) => {
      const matchesSearch =
        habit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        habit.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "" || selectedCategory === "All"
          ? true
          : habit.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [data, searchTerm, selectedCategory]);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-500">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Explore Public Habits
      </h1>

      {/* 🔍 Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
        <input
          type="text"
          placeholder="Search by title or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 w-full md:w-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 w-full md:w-1/4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Habits Grid */}
      {filteredHabits.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
          No habits found. Try adjusting your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHabits.map((habit) => (
            <div
              key={habit._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                {habit.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {habit.description.slice(0, 100)}...
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                <p>Category: {habit.category}</p>
                <p>By: {habit.userName}</p>
              </div>
              <button
                onClick={() => handleSeeDetails(habit._id)}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition"
              >
                See Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowsePublicHabits;
