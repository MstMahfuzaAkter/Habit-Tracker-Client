import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiFire,
} from "react-icons/hi";
import { AuthContext } from "../../context/AuthContext";
import { calculateStreak } from "./calculateStreak";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const MyHabits = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- Fetch Habits ---------------- */
  useEffect(() => {
    if (!user?.email) return;

    const fetchHabits = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://habit-tracker-server-coral.vercel.app/my-habits/${user.email}`
        );
        const data = await res.json();

        const today = new Date().toISOString().split("T")[0];

        const formatted = (data.result || []).map((habit) => ({
          ...habit,
          completedToday: habit.completionHistory?.includes(today),
          currentStreak: calculateStreak(habit.completionHistory),
        }));

        setHabits(formatted);
      } catch {
        Swal.fire("Error", "Failed to load habits", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, [user]);

  /* ---------------- Handlers ---------------- */
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Habit?",
      text: "This will permanently remove your habit.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(
          `https://habit-tracker-server-coral.vercel.app/habit/${id}`,
          { method: "DELETE" }
        );
        setHabits((prev) => prev.filter((h) => h._id !== id));
        toast.success("Habit deleted");
      }
    });
  };

  const handleMarkComplete = async (id) => {
    const today = new Date().toISOString().split("T")[0];

    setHabits((prev) =>
      prev.map((habit) => {
        if (habit._id !== id || habit.completedToday) return habit;

        const updatedHistory = [...(habit.completionHistory || []), today];

        fetch(
          `https://habit-tracker-server-coral.vercel.app/habit/${id}/complete`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ date: today }),
          }
        );

        return {
          ...habit,
          completionHistory: updatedHistory,
          completedToday: true,
          currentStreak: calculateStreak(updatedHistory),
        };
      })
    );
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            My <span className="text-blue-600 dark:text-blue-400">Habits</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {habits.filter((h) => !h.completedToday).length} remaining today
          </p>
        </div>

        <button
          onClick={() => navigate("/add-habit")}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors"
        >
          + Add Habit
        </button>
      </div>

      {/* Empty State */}
      {habits.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-2xl border-slate-300 dark:border-slate-700">
          <p className="text-xl font-bold text-slate-700 dark:text-slate-300">
            No habits yet
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            Start by adding your first habit
          </p>
        </div>
      ) : (
        /* Table */
        <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <tr>
                <th className="px-6 py-4 text-left">Habit</th>
                <th className="px-6 py-4 text-center">Category</th>
                <th className="px-6 py-4 text-center">Streak</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {habits.map((habit) => (
                <tr
                  key={habit._id}
                  className="border-t dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                >
                  {/* Title */}
                  <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">
                    {habit.title}
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                      {habit.category}
                    </span>
                  </td>

                  {/* Streak */}
                  <td className="px-6 py-4 text-center font-bold text-orange-500">
                    <div className="flex items-center justify-center gap-1">
                      <HiFire />
                      {habit.currentStreak}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    {habit.completedToday ? (
                      <span className="text-green-600 dark:text-green-400 font-bold">
                        Completed
                      </span>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-500 font-medium">
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleMarkComplete(habit._id)}
                        disabled={habit.completedToday}
                        className={`px-3 py-2 rounded-lg flex items-center gap-1 text-sm font-bold transition-colors ${
                          habit.completedToday
                            ? "bg-green-500 text-white cursor-default"
                            : "bg-slate-100 dark:bg-slate-700 hover:bg-blue-600 hover:text-white"
                        }`}
                      >
                        <HiOutlineCheckCircle />
                        Done
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/update-habit/${habit._id}`)
                        }
                        className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                      >
                        <HiOutlinePencilAlt />
                      </button>

                      <button
                        onClick={() => handleDelete(habit._id)}
                        className="px-3 py-2 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                      >
                        <HiOutlineTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyHabits;
