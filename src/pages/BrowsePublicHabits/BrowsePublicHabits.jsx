import { useLoaderData } from "react-router";
import { useNavigate } from "react-router";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";

const BrowsePublicHabits = () => {
  const data = useLoaderData(); 
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSeeDetails = (habitId) => {
    const isLoggedIn = localStorage.getItem("token");

    if (!isLoggedIn) {
      toast.error("Please log in to view habit details!");
      setTimeout(() => navigate("/login"), 1000);
    } else {
      navigate(`/habit/${habitId}`);
    }
  };

  // Get unique categories dynamically
  const categories = useMemo(() => {
    const cats = data.map((h) => h.category);
    return ["All", ...new Set(cats)];
  }, [data]);

  // Filter habits based on search + category
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Explore Public Habits 🌍
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
        <input
          type="text"
          placeholder="Search by title or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        <p className="text-center text-gray-500 mt-10">
          No habits found. Try adjusting your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHabits.map((habit) => (
            <div
              key={habit._id}
              className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {habit.title}
              </h2>
              <p className="text-gray-600 mb-3">
                {habit.description.slice(0, 100)}...
              </p>
              <div className="text-sm text-gray-500 mb-4">
                <p>Category: {habit.category}</p>
                <p>By: {habit.userName}</p>
              </div>
              <button
                onClick={() => handleSeeDetails(habit._id)}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition"
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
