import React, { useState, useMemo } from "react";
import { useLoaderData } from "react-router";
import toast from "react-hot-toast";
import { calculateStreak } from "../MyHabits/calculateStreak";
import { HiFire, HiCalendar, HiClock, HiCheckCircle, HiUserCircle } from "react-icons/hi";

const HabitDetails = () => {
  const data = useLoaderData();
  const habitData = data?.result;
  const [habit, setHabit] = useState(habitData);

  if (!habit)
    return (
      <div className="flex justify-center items-center h-96 font-bold text-slate-400 dark:text-slate-500">
        Habit data unavailable.
      </div>
    );

  const todayStr = new Date().toISOString().split("T")[0];

  const completionDates = useMemo(
    () =>
      (habit.completionHistory || []).map((d) =>
        new Date(d).toISOString().split("T")[0]
      ),
    [habit.completionHistory]
  );

  const streak = calculateStreak(completionDates);
  const isCompletedToday = completionDates.includes(todayStr);

  const handleMarkComplete = async () => {
    if (isCompletedToday) return toast.error("Already tracked for today!");

    const updatedCompletion = [...(habit.completionHistory || []), todayStr];
    setHabit((prev) => ({ ...prev, completionHistory: updatedCompletion }));

    try {
      const res = await fetch(
        `https://habit-tracker-server-coral.vercel.app/habit/${habit._id}/complete`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: todayStr }),
        }
      );
      if (res.ok) toast.success("Daily goal reached!");
    } catch {
      toast.error("Cloud synchronization failed.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 lg:px-12 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
        {/* Left Image */}
        <div className="w-full lg:w-[450px] ">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">
            <HiCalendar className="text-lg" />
            <span>Routine Protocol</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4 dark:text-white leading-tight">
            {habit.title}
          </h1>
          <div className="group relative overflow-hidden rounded   dark:border-slate-800">
            <img
              src={
                habit.image ||
                "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000"
              }
              alt={habit.title}
              className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-4 py-2 bg-blue-600/90 backdrop-blur-md text-white rounded-2xl text-xs font-black uppercase tracking-widest">
                {habit.category}
              </span>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 space-y-8">
          <header>

            <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg leading-relaxed max-w-2xl italic">
              "{habit.description}"
            </p>
          </header>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              icon={<HiFire className="text-orange-500" />}
              label="Current Streak"
              value={`${streak} Days`}
            />
            <StatCard
              icon={<HiClock className="text-blue-500" />}
              label="Reminder"
              value={habit.reminderTime || "Not Set"}
            />
            <StatCard
              icon={<HiUserCircle className="text-emerald-500" />}
              label="Author"
              value={habit.userName.split(" ")[0]}
            />
          </div>

          {/* Task Execution */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest text-sm">
                Task Execution
              </h3>
              {isCompletedToday && (
                <span className="text-emerald-500 font-bold flex items-center gap-1">
                  <HiCheckCircle /> Verified
                </span>
              )}
            </div>

            <button
              onClick={handleMarkComplete}
              disabled={isCompletedToday}
              className={`w-full py-3 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl ${isCompletedToday
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/40 hover:-translate-y-1"
                }`}
            >
              {isCompletedToday ? "Successfully Logged" : "Confirm Completion"}
            </button>
          </div>

          {/* Footer Metadata */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-bold text-slate-400 uppercase tracking-tighter">
            <span>ID: {habit._id.slice(-8)}</span>
            <span>Created: {new Date(habit.createdAt).toLocaleDateString()}</span>
            <span>Ref: {habit.userEmail}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, label, value }) => (
  <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col items-start">
    <div className="text-2xl mb-2">{icon}</div>
    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-300">
      {label}
    </div>
    <div className="text-xl font-black text-slate-800 dark:text-white mt-1">{value}</div>
  </div>
);

export default HabitDetails;
