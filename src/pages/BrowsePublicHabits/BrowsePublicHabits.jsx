import { useLoaderData } from "react-router";
import { useNavigate } from "react-router";
import { useState, useMemo, useContext } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaArrowRight, FaFire, FaStar } from "react-icons/fa";

import { AuthContext } from "../../context/AuthContext";
import Loader from "../Loader/Loader";

const BrowsePublicHabits = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  if (loading) return <Loader />;

  const handleSeeDetails = (habitId) => {
    if (!user) {
      toast.error("Please log in to view habit details!");
      setTimeout(() => navigate("/auth/login"), 1000);
    } else {
      navigate(`/habit/${habitId}`);
    }
  };

  // Generate unique categories for the filter dropdown
  const categories = useMemo(() => {
    if (!data) return ["All"];
    const cats = data.map((h) => h.category).filter(Boolean);
    return ["All", ...new Set(cats)];
  }, [data]);

  // Search and Category Filter Logic
  const filteredHabits = useMemo(() => {
    if (!data) return [];
    return data.filter((habit) => {
      const title = habit.title || "";
      const desc = habit.description || "";
      const matchesSearch =
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        desc.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "" || selectedCategory === "All"
          ? true
          : habit.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [data, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#0B0F1A] transition-colors duration-500 pb-20 pt-10">
      
      {/* 1. Header & Search Controls */}
      <div className="max-w-[1500px] mx-auto px-6 mb-12">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
            Global <span className="text-blue-600">Habit Feed</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            Discover and replicate high-performance routines from around the world.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-4 items-center bg-white dark:bg-slate-900 p-4 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-blue-500/5">
          {/* Search Input */}
          <div className="relative w-full lg:flex-1">
            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search routines, keywords, or creators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-[1.8rem] bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white font-medium"
            />
          </div>

          {/* Category Filter */}
          <div className="relative w-full lg:w-72">
            <FaFilter className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-14 pr-10 py-4 rounded-[1.8rem] bg-slate-50 dark:bg-slate-800 border-none appearance-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white font-bold cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. Habits Grid (4-Column Layout) */}
      <div className="max-w-[1500px] mx-auto px-6">
        <AnimatePresence mode="popLayout">
          {filteredHabits.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-center py-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] text-slate-400"
            >
              <p className="text-2xl font-bold mb-2">No routines found</p>
              <p>Try adjusting your search terms or category filters.</p>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              layout
            >
              {filteredHabits.map((habit, index) => (
                <motion.div
                  layout
                  key={habit._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-4 flex flex-col h-full hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Image Container */}
                  <div className="relative h-48 w-full rounded-[1.8rem] overflow-hidden mb-5">
                    <img 
                      src={habit.image || "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=500"} 
                      alt={habit.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest shadow-sm">
                      {habit.category || "General"}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="px-2 flex-grow">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h2 className="text-lg font-black text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {habit.title}
                      </h2>
                      <div className="flex items-center gap-1 text-orange-500 font-bold text-xs shrink-0">
                        <FaFire /> {habit.streak || 0}
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-6">
                      {habit.description || "Unlock the potential of your day with this community-shared habit routine."}
                    </p>
                  </div>

                  {/* Meta Footer */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-[10px] font-black text-blue-600">
                        {habit.userName?.charAt(0) || "U"}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-none">
                          {habit.userName || "Pro User"}
                        </span>
                        <div className="flex items-center gap-0.5 mt-1">
                           <FaStar className="text-yellow-400 text-[8px]" />
                           <span className="text-[9px] text-slate-400 font-bold">4.9</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleSeeDetails(habit._id)}
                      className="bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-600 dark:text-slate-300 p-3 rounded-full transition-all group-hover:rotate-[-45deg]"
                    >
                      <FaArrowRight className="text-sm" />
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