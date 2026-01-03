import React from "react";
import { motion } from "framer-motion";
import { FaBrain, FaSmile, FaClock, FaChartLine } from "react-icons/fa";

const benefits = [
  {
    icon: <FaBrain />,
    title: "Cognitive Clarity",
    description: "Developing automated routines sharpens focus, reducing the mental load required for daily decisions.",
  },
  {
    icon: <FaSmile />,
    title: "Stress Mitigation",
    description: "Consistent habits provide a reliable structure, significantly lowering cortisol levels and anxiety.",
  },
  {
    icon: <FaClock />,
    title: "Peak Efficiency",
    description: "Mastering your schedule through discipline reclaims wasted hours, turning time into your greatest asset.",
  },
  {
    icon: <FaChartLine />,
    title: "Personal Growth",
    description: "The compounding effect of small daily wins fosters confidence and builds a foundation for success.",
  },
];

const WhyBuildHabits = () => {
  return (
    <section className=" bg-[#FDFDFD] dark:bg-[#0B0F1A] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto ">
        
        {/* standardized Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-4">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
            Why Build <span className="text-blue-600">Habits?</span>
          </h2>
          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium">
            Success is not a one-time event, but a result of consistent daily actions.
          </p>
        </div>

        {/* 4-Column Grid with Consistent Card Sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center text-2xl mb-6">
                {benefit.icon}
              </div>

              {/* Consistent Card Title Size */}
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                {benefit.title}
              </h3>
              
              {/* Consistent Body Text Size */}
              <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBuildHabits;