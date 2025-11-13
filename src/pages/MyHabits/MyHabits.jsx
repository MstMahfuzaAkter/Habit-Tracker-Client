import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { calculateStreak } from "./calculateStreak";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../Loader/Loader";

const MyHabits = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch habits from backend
  const fetchHabits = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`https://habit-tracker-server-coral.vercel.app/my-habits/${user.email}`);
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
        title: "Failed to load habits",
        text: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [user]);

  // SweetAlert for delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`https://habit-tracker-server-coral.vercel.app/habit/${id}`, { method: "DELETE" });
          setHabits((prev) => prev.filter((h) => h._id !== id));
          Swal.fire("Deleted!", "Your habit has been deleted.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Failed to delete habit.", "error");
        }
      }
    });
  };

  // Mark complete with SweetAlert
  const handleMarkComplete = async (id) => {
    const todayStr = new Date().toISOString().split("T")[0];

    setHabits((prev) =>
      prev.map((habit) => {
        if (habit._id !== id) return habit;

        if (habit.completedToday) {
          Swal.fire({
            icon: "info",
            title: "Already Completed",
            text: "You have already marked this habit as complete today!",
          });
          return habit;
        }

        const updatedHistory = [...(habit.completionHistory || []), todayStr];
        const newStreak = calculateStreak(updatedHistory);

        // Update backend
        fetch(`https://habit-tracker-server-coral.vercel.app/habit/${id}/complete`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: todayStr }),
        })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Great job! 💪",
              text: `You have completed "${habit.title}" for today.`,
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Oops!",
              text: "Failed to update habit on the server.",
            });
          });

        return { ...habit, completionHistory: updatedHistory, currentStreak: newStreak, completedToday: true };
      })
    );
  };

  if (loading)
    return <Loader></Loader>

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Habits</h1>

      {habits.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No habits found. Add one to get started!</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left w-1/4">Title</th>
                  <th className="px-4 py-2 text-left w-1/6">Category</th>
                  <th className="px-4 py-2 text-left w-1/6">Current Streak</th>
                  <th className="px-4 py-2 text-left w-1/6">Created Date</th>
                  <th className="px-4 py-2 text-left w-1/4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {habits.map((habit) => (
                  <tr key={habit._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 truncate max-w-xs">{habit.title}</td>
                    <td className="px-4 py-2 truncate max-w-xs">{habit.category}</td>
                    <td className="px-4 py-2">{habit.currentStreak}</td>
                    <td className="px-4 py-2">{new Date(habit.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2 space-x-2 flex flex-wrap">
                      <button
                        onClick={() => {
                          navigate(`/update-habit/${habit._id}`);
                          Swal.fire({
                            icon: "info",
                            title: "Redirecting...",
                            text: `You will update "${habit.title}".`,
                            timer: 1200,
                            showConfirmButton: false,
                          });
                        }}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(habit._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleMarkComplete(habit._id)}
                        disabled={habit.completedToday}
                        className={`px-2 py-1 rounded text-sm text-white ${habit.completedToday
                            ? "bg-green-500 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                          }`}
                      >
                        {habit.completedToday ? "Completed" : "Mark Complete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {habits.map((habit) => (
              <div key={habit._id} className="border rounded-lg p-4 shadow-sm bg-white">
                <h2 className="font-bold text-lg mb-1">{habit.title}</h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Category:</span> {habit.category}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Current Streak:</span> {habit.currentStreak}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Created:</span> {new Date(habit.createdAt).toLocaleDateString()}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      navigate(`/update-habit/${habit._id}`);
                      Swal.fire({
                        icon: "info",
                        title: "Redirecting...",
                        text: `You will update "${habit.title}".`,
                        timer: 1200,
                        showConfirmButton: false,
                      });
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition flex-1"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(habit._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition flex-1"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleMarkComplete(habit._id)}
                    disabled={habit.completedToday}
                    className={`px-2 py-1 rounded text-white flex-1 ${habit.completedToday
                        ? "bg-green-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                      }`}
                  >
                    {habit.completedToday ? "Completed" : "Mark Complete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyHabits;
