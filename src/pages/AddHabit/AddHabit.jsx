import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const AddHabitModal = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = {
      title: form.title.value,
      category: form.category.value,
      description: form.description.value,
      reminderTime: form.reminderTime.value,
      image: form.image.value || "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=500",
      userEmail: user.email,
      userName: user.displayName || user.name,
      createdAt: new Date(),
      completionHistory: [],
      streak: 0,
      isPublic: false,
    };

    try {
      const res = await fetch("https://habit-tracker-server-coral.vercel.app/habit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Habit added successfully!");
        form.reset();
        setTimeout(() => navigate("/my-habit"), 1500);
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to add habit");
      }
    } catch (err) {
      toast.error("Connection error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-black/20 font-sans">
      {/* --- Customized Toaster to match UI --- */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'dark:bg-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 font-bold rounded-2xl shadow-2xl',
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#2563EB', // Blue-600
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444', // Red-500
              secondary: '#FFFFFF',
            },
          }
        }}
      />

      <div className="card bg-white dark:bg-slate-900 w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 relative">
          <header className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Create a <span className="text-blue-600">New Habit</span>
            </h2>
            <p className="text-slate-500 text-sm mt-2">Define your routine and start tracking progress.</p>
          </header>

          {loading && (
            <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center z-50">
              <LoadingSpinner />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-4 mb-1 block italic">Habit Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Morning Meditation"
                  className="input w-full rounded-2xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-4 mb-1 block italic">Category</label>
                <select
                  name="category"
                  required
                  defaultValue=""
                  className="select w-full rounded-2xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="" disabled>Select</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Work">Work</option>
                  <option value="Study">Study</option>
                  <option value="Mindset">Mindset</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-4 mb-1 block italic">Reminder</label>
                <input
                  type="time"
                  name="reminderTime"
                  className="input w-full rounded-2xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-4 mb-1 block italic">Description</label>
              <textarea
                name="description"
                required
                placeholder="What is the goal of this habit?"
                className="textarea w-full rounded-2xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 h-24 transition-all"
              ></textarea>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-4 mb-1 block italic">Cover Image URL</label>
              <input
                type="url"
                name="image"
                placeholder="https://images.unsplash.com/..."
                className="input w-full rounded-2xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold text-white transition-all transform active:scale-95 ${
                loading ? "bg-slate-400" : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30"
              }`}
            >
              {loading ? "Saving Routine..." : "Launch Habit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHabitModal;