import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Alice",
    feedback: "This app helped me maintain a consistent morning routine and feel more productive.",
  },
  {
    name: "Bob",
    feedback: "Tracking my habits visually keeps me motivated every day to stick to my goals.",
  },
  {
    name: "Charlie",
    feedback: "I love the streak feature! It really pushes me to complete tasks daily.",
  },
];

const UserFeedback = () => {
  return (
    <section className="py-6 mt-8  bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What Our Users Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <FaQuoteLeft className="text-indigo-500 mb-2" size={24} />
              <p className="text-gray-700 dark:text-gray-300 mb-4">{t.feedback}</p>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserFeedback;
