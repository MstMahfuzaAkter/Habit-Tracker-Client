import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";

const UpdateHabit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState({});
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch habit data
  useEffect(() => {
    fetch(`http://localhost:3000/habit/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.result) {
          setHabit(data.result);
        } else {
          toast.error("Failed to load habit data");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error loading habit");
        setLoading(false);
      });
  }, [id]);

  // 🔹 Handle Update
  const handleSubmit = (e) => {
    e.preventDefault();
    const { _id, ...updatedData } = habit;

    fetch(`http://localhost:3000/habit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Habit updated successfully!", {
            duration: 3000,
            position: "top-right",
          });
          setTimeout(() => navigate("/my-habits"), 600);
        } else {
          toast.error("Failed to update habit!");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Server error. Please try again!");
      });
  };

  if (loading) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-300 py-10">
        Loading habit...
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800 p-6 rounded-2xl transition-all duration-300">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
        Update Habit
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Habit Title */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
            Habit Title
          </label>
          <input
            type="text"
            value={habit.title || ""}
            onChange={(e) => setHabit({ ...habit, title: e.target.value })}
            className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
            Category
          </label>
          <input
            type="text"
            value={habit.category || ""}
            onChange={(e) => setHabit({ ...habit, category: e.target.value })}
            className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
            Description
          </label>
          <textarea
            value={habit.description || ""}
            onChange={(e) => setHabit({ ...habit, description: e.target.value })}
            className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        {/* Reminder Time */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
            Reminder Time
          </label>
          <input
            type="time"
            value={habit.reminderTime || ""}
            onChange={(e) =>
              setHabit({ ...habit, reminderTime: e.target.value })
            }
            className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* User Info */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
            User Name
          </label>
          <input
            type="text"
            value={habit.userName || ""}
            disabled
            className="border border-gray-200 dark:border-gray-700 w-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
            User Email
          </label>
          <input
            type="email"
            value={habit.userEmail || ""}
            disabled
            className="border border-gray-200 dark:border-gray-700 w-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 p-2 rounded-md"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
            Upload Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setHabit({
                ...habit,
                image: e.target.files[0]?.name || habit.image,
              })
            }
            className="file-input file-input-bordered w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-all duration-200 shadow-md"
          >
            Update Habit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateHabit;
