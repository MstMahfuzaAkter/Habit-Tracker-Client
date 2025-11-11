import React, { useState } from "react";
import { useLoaderData } from "react-router";
import toast from "react-hot-toast";
import { calculateStreak } from "../MyHabits/calculateStreak";


const HabitDetails = () => {
  const data = useLoaderData();
  const habitData = data?.result;
  const [habit, setHabit] = useState(habitData);

  if (!habit) return <p className="text-center mt-10">Habit not found</p>;

  const todayStr = new Date().toISOString().split("T")[0];
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  });

  const completionDates = (habit.completionHistory || []).map(d => new Date(d).toISOString().split("T")[0]);
  const completedDays = last30Days.filter(d => completionDates.includes(d)).length;
  const progressPercent = Math.round((completedDays / 30) * 100);
  const streak = calculateStreak(completionDates);

  const handleMarkComplete = async () => {
    if (completionDates.includes(todayStr)) {
      toast.error("Already marked complete today!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/habit/${habit._id}/complete`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: todayStr }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Marked as complete!");
        setHabit(prev => ({
          ...prev,
          completionHistory: [...(prev.completionHistory || []), todayStr],
          currentStreak: calculateStreak([...completionDates, todayStr]),
        }));
      } else {
        toast.error(data.message || "Failed to mark complete!");
      }
    } catch {
      toast.error("Server error!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 md:p-6 lg:p-8">
      <div className="card bg-white shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8">
          {habit.image && (
            <div className="shrink-0 w-full md:w-1/2 h-64 md:h-auto">
              <img
                src={habit.image}
                alt={habit.title}
                className="w-full h-full object-cover rounded-xl shadow-md"
              />
            </div>
          )}
          <div className="flex flex-col justify-start space-y-4 w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{habit.title}</h1>

            <div className="flex flex-wrap gap-3">
              <span className="badge badge-lg badge-outline text-blue-600 border-blue-600 font-medium">{habit.category}</span>
              <span className="badge badge-lg badge-outline text-gray-500 border-gray-500 font-medium">
                Reminder: {habit.reminderTime || "Not set"}
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed text-base md:text-lg">{habit.description}</p>

            <div className="text-sm text-gray-500 space-y-1">
              <p><span className="font-semibold">Created by:</span> {habit.userName}</p>
              <p><span className="font-semibold">Email:</span> {habit.userEmail}</p>
              <p><span className="font-semibold">Created At:</span> {new Date(habit.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="mt-4">
              <p className="font-semibold mb-1">Progress (Last 30 Days): {progressPercent}%</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            <div className="mt-4">
              <span className="inline-block bg-yellow-400 text-black font-bold px-4 py-1 rounded-full">🔥 {streak} Day Streak</span>
            </div>

            <div className="mt-6">
              <button
                onClick={handleMarkComplete}
                disabled={completionDates.includes(todayStr)}
                className={`px-5 py-2 rounded-lg shadow text-white ${
                  completionDates.includes(todayStr) ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {completionDates.includes(todayStr) ? "Completed" : "Mark Complete ✅"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDetails;
