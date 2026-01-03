import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import LoadingSpinner from "../pages/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion"; 
import { FaArrowRight, FaFire, FaCircle, FaStar } from "react-icons/fa";

const PublicHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://habit-tracker-server-coral.vercel.app/latest-habit")
      .then((res) => res.json())
      .then((data) => {
        setHabits(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching habits:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#0B0F1A] transition-colors duration-500 pb-10 pt-10">
      
      {/* Section Header */}
      <div className="max-w-[1400px] mx-auto  mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div >
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
            Community <span className="text-blue-600">Library</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">
            Explore 4-step routines and habits from our global users.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 dark:bg-blue-500/10 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-500/20">
          <FaCircle className="text-[8px] animate-pulse" /> {habits.length} Public Habits Live
        </div>
      </div>

      {/* 4-Column Responsive Grid */}
      <div className="max-w-[1400px] mx-auto ">
        {habits.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-slate-400">
            No habits shared yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {habits.map((habit, index) => (
              <motion.div
                key={habit._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(`/habit/${habit._id}`)}
                className="group cursor-pointer bg-white px-2 dark:bg-slate-900  dark:border-slate-800 rounded-[2rem]  transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/50 flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative w-full h-48 mb-4 overflow-hidden rounded-[1.5rem]">
                  <img
                    src={habit.image || "https://images.unsplash.com/photo-1506784919141-118e77a5996b?q=80&w=500"}
                    alt={habit.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Category Badge on Image */}
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-blue-600 shadow-sm uppercase tracking-wider">
                    {habit.category || "General"}
                  </div>
                </div>

                {/* Content */}
                <div className="px-2 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">
                      {habit.title}
                    </h2>
                    <div className="flex items-center gap-1 text-xs font-bold text-orange-500">
                      <FaFire /> {habit.streak || 0}
                    </div>
                  </div>
                  

                  {/* Meta Info (Price/Status Row) */}
                  <div className="flex items-center justify-between mt-auto mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-1">
                       Rating: <FaStar className="text-yellow-400" /> 4.8
                    </span>
                    <span className="text-green-500">Public Access</span>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">
                        {habit.userName?.charAt(0) || "U"}
                      </div>
                      <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 truncate w-20">
                        {habit.userName || "User"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-[11px] group-hover:translate-x-1 transition-transform">
                      View Details <FaArrowRight className="text-[10px]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicHabits;