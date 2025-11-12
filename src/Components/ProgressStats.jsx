import React, { useEffect, useState, useMemo, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

const ProgressState = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch habits from backend
  useEffect(() => {
    if (!user?.email) return;

    const fetchHabits = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://habit-tracker-server-coral.vercel.app/my-habits/${user.email}`);
        const data = await res.json();
        if (data.success && data.result) {
          setHabits(data.result);
        }
      } catch (err) {
        console.error("Failed to fetch habits:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, [user]);

  // Calculate stats
  const totalHabits = habits.length;

  const completedToday = useMemo(() => {
    const todayStr = new Date().toISOString().split("T")[0];
    return habits.filter(habit => habit.completionHistory?.includes(todayStr)).length;
  }, [habits]);

  const longestStreak = useMemo(() => {
    const streaks = habits.map(habit => {
      const history = habit.completionHistory || [];
      let maxStreak = 0, tempStreak = 0;

      if (!history.length) return 0;

      const sorted = [...history].sort((a, b) => new Date(a) - new Date(b));

      for (let i = 0; i < sorted.length; i++) {
        if (i === 0) tempStreak = 1;
        else {
          const diff = (new Date(sorted[i]) - new Date(sorted[i - 1])) / (1000 * 60 * 60 * 24);
          tempStreak = diff === 1 ? tempStreak + 1 : 1;
        }
        if (tempStreak > maxStreak) maxStreak = tempStreak;
      }

      return maxStreak;
    });

    return streaks.length ? Math.max(...streaks) : 0;
  }, [habits]);

  const stats = [
    { title: "Total Habits", value: totalHabits },
    { title: "Completed Today", value: completedToday },
    { title: "Longest Streak", value: longestStreak },
  ];

  if (loading) {
    return <p className="text-center py-10 text-gray-500 dark:text-gray-400">Loading your progress...</p>;
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Track Your Progress
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="w-full max-w-xs bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3 className="text-3xl font-extrabold mb-2 text-indigo-600 dark:text-indigo-400">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-300">{stat.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgressState;
