import React from "react";
import { motion } from "framer-motion";
import { FaAward, FaQuoteLeft, FaFireAlt, FaRegCalendarCheck, FaSun } from "react-icons/fa";

const badges = [
  { name: "7-Day Streak", color: "from-indigo-500 to-blue-500", icon: <FaFireAlt /> },
  { name: "30-Day Streak", color: "from-emerald-500 to-teal-500", icon: <FaRegCalendarCheck /> },
  { name: "100% Mastery", color: "from-amber-400 to-orange-500", icon: <FaAward /> },
  { name: "Early Bird", color: "from-rose-500 to-orange-400", icon: <FaSun /> },
];

const MotivationalSection = () => {
  return (
    <section className="py-10 bg-[#FDFDFD] dark:bg-[#0B0F1A] transition-colors duration-500 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 text-center">
        
        {/* Standardized Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">
            Unlock Your <span className="text-blue-600">Potential</span>
          </h2>
          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium">
            Celebrate your milestones and keep the momentum going.
          </p>
        </motion.div>

        {/* Highlighted Quote: Professional Editorial Look */}
        <div className="relative max-w-4xl mx-auto mb-4 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border border-slate-100 dark:border-slate-800">
          <FaQuoteLeft className="absolute top-8 left-8 text-blue-500/20 text-4xl" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 italic leading-snug"
          >
            "Success is the sum of small efforts, repeated day in and day out."
          </motion.p>
          <p className="mt-4 text-sm font-black uppercase tracking-[0.3em] text-blue-600">Daily Focus</p>
        </div>

        {/* Professional Badges: Pill-Shape & Gradients */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group cursor-default"
            >
              <div className={`flex flex-col items-center gap-4 p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-2xl group-hover:shadow-blue-500/10`}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${badge.color} text-white flex items-center justify-center text-2xl shadow-lg shadow-blue-500/20`}>
                  {badge.icon}
                </div>
                <span className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                  {badge.name}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-500 transition-colors">
                  Achievement
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MotivationalSection;