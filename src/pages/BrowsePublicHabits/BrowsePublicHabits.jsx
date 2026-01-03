import { useContext, useMemo, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaArrowRight,
  FaFire,
  FaStar,
} from "react-icons/fa";

import { AuthContext } from "../../context/AuthContext";
import Loader from "../Loader/Loader";

const BrowsePublicHabits = () => {
  /* -------------------- Hooks & Context -------------------- */
  const habits = useLoaderData();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  if (loading) return <Loader />;

  /* -------------------- Handlers -------------------- */
  const handleSeeDetails = (habitId) => {
    if (!user) {
      toast.error("Please log in to view habit details!");
      return setTimeout(() => navigate("/auth/login"), 1000);
    }
    navigate(`/habit/${habitId}`);
  };

  /* -------------------- Derived Data -------------------- */
  const categories = useMemo(() => {
    if (!habits?.length) return ["All"];
    const unique = new Set(habits.map((h) => h.category).filter(Boolean));
    return ["All", ...unique];
  }, [habits]);

  const filteredHabits = useMemo(() => {
    if (!habits?.length) return [];

    return habits.filter((habit) => {
      const search = searchTerm.toLowerCase();

      // Search on multiple fields: title + description + userName
      const matchesTitle = habit.title?.toLowerCase().includes(search);
      const matchesDesc = habit.description?.toLowerCase().includes(search);
      const matchesUser = habit.userName?.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "All" || habit.category === selectedCategory;

      return (matchesTitle || matchesDesc || matchesUser) && matchesCategory;
    });
  }, [habits, searchTerm, selectedCategory]);

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#0B0F1A] transition-colors pb-20 pt-10">
      {/* ===== Header & Controls ===== */}
      <div className="max-w-[1500px] mx-auto px-6 mb-12">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white mb-4">
            Global <span className="text-blue-600">Habit Feed</span>
          </h1>
          <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
            Discover and replicate high-performance routines worldwide.
          </p>
        </header>

        {/* Search & Filter */}
        <div className="flex flex-col lg:flex-row gap-4 items-center bg-white dark:bg-slate-900 p-4 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-blue-500/5">
          {/* Search */}
          <div className="relative w-full lg:flex-1">
            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search title, description, or creator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-[1.8rem] bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 dark:text-white"
            />
          </div>

          {/* Category Filter */}
          <div className="relative w-full lg:w-72">
            <FaFilter className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-14 pr-10 py-4 rounded-[1.8rem] bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 font-bold text-slate-900 dark:text-white cursor-pointer appearance-none"
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ===== Habits Grid ===== */}
      <div className="max-w-[1500px] mx-auto px-6">
        <AnimatePresence mode="popLayout">
          {!filteredHabits.length ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] text-slate-400"
            >
              <p className="text-2xl font-bold mb-2">No routines found</p>
              <p>Try adjusting your search or filters.</p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredHabits.map((habit, index) => (
                <motion.div
                  key={habit._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-4 flex flex-col hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)]"
                >
                  {/* Image */}
                  <div className="relative h-48 rounded-[1.8rem] overflow-hidden mb-5">
                    <img
                      src={
                        habit.image ||
                        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=500"
                      }
                      alt={habit.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/90 dark:bg-slate-900/90 text-blue-600">
                      {habit.category || "General"}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow px-2">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-lg font-black text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600">
                        {habit.title}
                      </h2>
                      <span className="flex items-center gap-1 text-xs font-bold text-orange-500">
                        <FaFire /> {habit.streak || 0}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6">
                      {habit.description ||
                        "Community-shared habit to upgrade your routine."}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-[10px] font-black text-blue-600">
                        {habit.userName?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                          {habit.userName || "Pro User"}
                        </p>
                        <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold">
                          <FaStar className="text-yellow-400" /> 4.9
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSeeDetails(habit._id)}
                      className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white transition-all group-hover:rotate-[-45deg]"
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BrowsePublicHabits;
