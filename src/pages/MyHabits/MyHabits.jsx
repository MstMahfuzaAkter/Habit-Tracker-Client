import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { calculateStreak } from "./calculateStreak";
import { AuthContext } from "../../context/AuthContext";

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
      toast.error("Failed to load habits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [user]);

  // SweetAlert delete
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
          await fetch(`http://localhost:3000/habit/${id}`, { method: "DELETE" });
          setHabits((prev) => prev.filter((h) => h._id !== id));
          Swal.fire("Deleted!", "Your habit has been deleted.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Failed to delete habit.", "error");
        }
      }
    });
  };

  // Mark complete
  const handleMarkComplete = async (id) => {
    const todayStr = new Date().toISOString().split("T")[0];
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit._id !== id) return habit;

        if (habit.completedToday) {
          toast.error("Already marked complete today!");
          return habit;
        }

        const updatedHistory = [...(habit.completionHistory || []), todayStr];
        const newStreak = calculateStreak(updatedHistory);
        toast.success("Marked complete! 💪");

        // Update backend
        fetch(`http://localhost:3000/habit/${id}/complete`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: todayStr }),
        }).catch(() => toast.error("Failed to update backend"));

        return { ...habit, completionHistory: updatedHistory, currentStreak: newStreak, completedToday: true };
      })
    );
  };

  if (loading)
    return <div className="text-center py-10 text-gray-600">Please wait... Loading your habits ⏳</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Habits</h1>

      {habits.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No habits found. Add one to get started!</p>
      ) : (
        <div className="overflow-x-auto">
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
                      onClick={() => navigate(`/update-habit/${habit._id}`)}
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
                      className={`px-2 py-1 rounded text-sm text-white ${
                        habit.completedToday
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
      )}
    </div>
  );
};

export default MyHabits;
