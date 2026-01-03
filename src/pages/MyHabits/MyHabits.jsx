import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { calculateStreak } from "./calculateStreak";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../Loader/Loader";
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineCheckCircle, HiFire, HiOutlineCalendar } from "react-icons/hi";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const MyHabits = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchHabits = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/my-habits/${user.email}`);
      const data = await res.json();
      const habitsWithStreak = (data.result || []).map((habit) => {
        const todayStr = new Date().toISOString().split("T")[0];
        const completedToday = habit.completionHistory?.includes(todayStr);
        const currentStreak = calculateStreak(habit.completionHistory);
        return { ...habit, completedToday, currentStreak };
      });
      setHabits(habitsWithStreak);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Connection Error",
        text: "Could not sync with the server.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Habit?",
      text: "This will permanently erase your streak data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, delete it",
      background: '#ffffff',
      customClass: {
        popup: 'rounded-[2rem]',
        confirmButton: 'rounded-xl px-6 py-3',
        cancelButton: 'rounded-xl px-6 py-3'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`http://localhost:3000/habit/${id}`, { method: "DELETE" });
          setHabits((prev) => prev.filter((h) => h._id !== id));
          toast.success("Habit removed");
        } catch (err) {
          Swal.fire("Error!", "Failed to delete habit.", "error");
        }
      }
    });
  };

  const handleMarkComplete = async (id) => {
    const todayStr = new Date().toISOString().split("T")[0];

    setHabits((prev) =>
      prev.map((habit) => {
        if (habit._id !== id) return habit;

        if (habit.completedToday) {
          Swal.fire({ icon: "info", title: "Already Done!", text: "You've crushed this habit today!" });
          return habit;
        }

        const updatedHistory = [...(habit.completionHistory || []), todayStr];
        const newStreak = calculateStreak(updatedHistory);

        fetch(`http://localhost:3000/habit/${id}/complete`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: todayStr }),
        }).catch(() => {
          Swal.fire("Error", "Failed to save progress.", "error");
        });

        return { ...habit, completionHistory: updatedHistory, currentStreak: newStreak, completedToday: true };
      })
    );
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 text-center md:text-left">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">My Daily <span className="text-blue-600">Habits</span></h1>
          <p className="text-slate-500 font-medium">Keep the fire burning. You have {habits.filter(h => !h.completedToday).length} tasks remaining today.</p>
        </div>
        <button 
          onClick={() => navigate("/add-habit")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl shadow-lg shadow-blue-500/30 transition-all active:scale-95"
        >
          + Add New Habit
        </button>
      </header>

      {habits.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">Your garden is empty</h3>
          <p className="text-slate-500 mb-6">Start your journey by adding your first habit.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {habits.map((habit) => (
            <div 
              key={habit._id} 
              className={`relative overflow-hidden bg-white dark:bg-slate-900 border-2 transition-all duration-300 rounded-[2.5rem] p-6 ${
                habit.completedToday 
                ? "border-green-500/50 shadow-green-500/5 bg-green-50/30 dark:bg-green-500/5" 
                : "border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none"
              }`}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">
                  {habit.category}
                </span>
                <div className="flex items-center gap-1 text-orange-500 font-black">
                  <HiFire className="text-xl" />
                  <span>{habit.currentStreak}</span>
                </div>
              </div>

              {/* Title & Date */}
              <h2 className="text-xl font-black text-slate-800 dark:text-white mb-1 line-clamp-1">{habit.title}</h2>
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-6">
                <HiOutlineCalendar />
                <span>Started {new Date(habit.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Action Progress */}
              <div className="space-y-4">
                <button
                  onClick={() => handleMarkComplete(habit._id)}
                  disabled={habit.completedToday}
                  className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-black transition-all ${
                    habit.completedToday
                    ? "bg-green-500 text-white cursor-default"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  <HiOutlineCheckCircle className="text-xl" />
                  {habit.completedToday ? "Completed Today" : "Mark as Done"}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/update-habit/${habit._id}`)}
                    className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 py-3 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-colors"
                  >
                    <HiOutlinePencilAlt className="mr-2" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(habit._id)}
                    className="p-3 rounded-2xl border border-red-100 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                  >
                    <HiOutlineTrash className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyHabits;