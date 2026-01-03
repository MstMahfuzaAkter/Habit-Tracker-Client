import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Alice Jenkins",
    role: "Productivity Enthusiast",
    feedback: "This app helped me maintain a consistent morning routine and feel significantly more productive throughout the work day.",
    avatar: "A",
  },
  {
    name: "Robert Fox",
    role: "Software Engineer",
    feedback: "Tracking my habits visually keeps me motivated. The interface is clean and it makes daily discipline feel like a game.",
    avatar: "R",
  },
  {
    name: "Charlie Davis",
    role: "Digital Nomad",
    feedback: "I love the streak feature! It really pushes me to complete tasks daily. This is the best habit tracker I've used so far.",
    avatar: "C",
  },
];

const UserFeedback = () => {
  return (
    <section className=" bg-[#FDFDFD] dark:bg-[#0B0F1A] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* standardized Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-4"
          >
            Trusted by <span className="text-blue-600">Achievers</span>
          </motion.h2>
          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Join thousands of users who have transformed their lives through consistent habit tracking.
          </p>
        </div>

        {/* Professional Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-5 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Quote Icon & Rating */}
              <div className="flex justify-between items-center mb-6">
                <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600">
                  <FaQuoteLeft size={20} />
                </div>
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <FaStar key={i} size={14} />)}
                </div>
              </div>

              {/* Standardized Body Text Consistency */}
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-8 italic font-medium">
                "{t.feedback}"
              </p>

              {/* User Identity Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {t.name}
                  </h4>
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserFeedback;