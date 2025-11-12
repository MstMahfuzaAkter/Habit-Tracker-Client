import React from "react";
import { motion } from "framer-motion";

const motivationalQuotes = [
  "Small steps every day lead to big results.",
  "Consistency is the key to success.",
  "Don’t break the streak!",
  "Every day is a new chance to improve.",
  "Progress, not perfection.",
];

const badges = [
  { name: "7-Day Streak", color: "bg-indigo-500" },
  { name: "30-Day Streak", color: "bg-green-500" },
  { name: "100% Completion", color: "bg-yellow-500" },
  { name: "Early Bird", color: "bg-red-500" },
];

const MotivationalSection = () => {
  return (
    <section className="py-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Stay Motivated!
        </motion.h2>

        {/* Motivational Quotes */}
        <div className="mb-10">
          {motivationalQuotes.map((quote, index) => (
            <motion.p
              key={index}
              className="text-gray-700 dark:text-gray-300 mb-4 text-lg md:text-xl italic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              "{quote}"
            </motion.p>
          ))}
        </div>

        {/* Achievement Badges */}
        <div className="flex flex-wrap justify-center gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              className={`px-4 py-2 rounded-full text-white font-semibold ${badge.color} shadow-md`}
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {badge.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MotivationalSection;
