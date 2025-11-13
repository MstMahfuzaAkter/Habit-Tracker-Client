import React, { useState, useMemo } from "react";
import { useLoaderData } from "react-router";
import toast from "react-hot-toast";
import { calculateStreak } from "../MyHabits/calculateStreak";

const HabitDetails = () => {
  const data = useLoaderData();
  const habitData = data?.result;
  const [habit, setHabit] = useState(habitData);

  if (!habit)
    return (
      <p className="text-center mt-10 text-gray-700 dark:text-gray-300">
        Habit not found
      </p>
    );

  const todayStr = new Date().toISOString().split("T")[0];
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  });

  const completionDates = useMemo(
    () =>
      (habit.completionHistory || []).map((d) =>
        new Date(d).toISOString().split("T")[0]
      ),
    [habit.completionHistory]
  );

  const completedDays = last30Days.filter((d) =>
    completionDates.includes(d)
  ).length;
  const progressPercent = Math.round((completedDays / 30) * 100);
  const streak = calculateStreak(completionDates);

  const handleMarkComplete = async () => {
    if (completionDates.includes(todayStr)) {
      toast.error("Already marked complete today!");
      return;
    }

    const updatedCompletion = [...(habit.completionHistory || []), todayStr];
    setHabit((prev) => ({
      ...prev,
      completionHistory: updatedCompletion,
      currentStreak: calculateStreak(updatedCompletion),
    }));

    try {
      const res = await fetch(
        `https://habit-tracker-server-coral.vercel.app/habit/${habit._id}/complete`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: todayStr }),
        }
      );
      const data = await res.json();
      if (data.success) toast.success("Marked as complete!");
      else toast.error(data.message || "Failed to mark complete!");
    } catch {
      toast.error("Server error!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 md:px-8">
      <div className="bg-white dark:bg-gray-900 shadow-xl dark:shadow-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 p-4 sm:p-6 md:p-8">
          {habit.image && (
            <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-auto flex-shrink-0">
              <img
                src={habit.image}
                alt={habit.title}
                className="w-full h-full object-cover rounded-xl shadow-md dark:shadow-gray-700 transition-all duration-300"
              />
            </div>
          )}

          <div className="flex flex-col justify-start space-y-4 w-full md:w-1/2 text-gray-800 dark:text-gray-200">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words">
              {habit.title}
            </h1>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="relative group inline-block">
                <span className="badge badge-lg badge-outline text-blue-600 border-blue-600 font-medium">
                  {habit.category}
                </span>
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded px-2 py-1 z-10 w-48">
                  Category: {habit.category}
                </div>
              </div>
              <div className="relative group inline-block">
                <span className="badge badge-lg badge-outline text-gray-500 border-gray-500 font-medium">
                  Reminder: {habit.reminderTime || "Not set"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="relative group inline-block">
              <p className="leading-relaxed text-sm sm:text-base md:text-lg break-words">
                {habit.description.length > 150
                  ? habit.description.slice(0, 150) + "..."
                  : habit.description}
              </p>
              {habit.description.length > 150 && (
                <div className="absolute top-full mt-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded px-2 py-2 w-64 max-h-40 overflow-y-auto whitespace-normal z-10">
                  {habit.description}
                </div>
              )}
            </div>

            {/* Meta */}
            <div className="text-xs sm:text-sm md:text-sm space-y-1 text-gray-500 dark:text-gray-400">
              <p>
                <span className="font-semibold">Created by:</span> {habit.userName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {habit.userEmail}
              </p>
              <p>
                <span className="font-semibold">Created At:</span>{" "}
                {new Date(habit.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Progress */}
            <div className="mt-4">
              <p className="font-semibold mb-1 text-sm sm:text-base">
                Progress (Last 30 Days): {progressPercent}%
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Streak */}
            <div className="mt-4">
              <span className="inline-block bg-yellow-400 text-black font-bold px-4 py-1 rounded-full text-sm sm:text-base">
                🔥 {streak} Day Streak
              </span>
            </div>

            {/* Button */}
            <div className="mt-6">
              <button
                onClick={handleMarkComplete}
                disabled={completionDates.includes(todayStr)}
                className={`w-full px-5 py-2 rounded-lg shadow text-white transition-all duration-300 text-sm sm:text-base ${
                  completionDates.includes(todayStr)
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                }`}
              >
                {completionDates.includes(todayStr)
                  ? "Completed"
                  : "Mark Complete ✅"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDetails;
