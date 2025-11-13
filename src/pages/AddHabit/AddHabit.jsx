import React, { useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const AddHabitModal = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      title: e.target.title.value,
      category: e.target.category.value,
      description: e.target.description.value,
      reminderTime: e.target.reminderTime.value,
      image: e.target.image.value,
      userEmail: user.email,
      userName: user.displayName || user.name,
      createdAt: new Date(),
      completionHistory: [],
      isPublic: false,
    };

    try {
      const res = await fetch(
        "https://habit-tracker-server-coral.vercel.app/habit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Habit added successfully!");
        e.target.reset();
      } else {
        toast.error(data.message || "Failed to add habit");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="card border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 w-full max-w-md shadow-2xl rounded-2xl transition-all duration-300">
        <div className="card-body p-6 relative">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
            Add New Habit
          </h2>

          {/* Spinner overlay */}
          {loading && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 rounded-2xl">
              <LoadingSpinner />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 relative z-0">
            {/* Habit Title */}
            <div>
              <label className="label font-medium text-gray-700 dark:text-gray-200">
                Habit Title
              </label>
              <input
                type="text"
                name="title"
                required
                className="input w-full rounded-full focus:border-0 focus:outline-gray-300 dark:focus:outline-gray-600"
                placeholder="Enter habit title"
              />
            </div>

            {/* Category */}
            <div>
              <label className="label font-medium text-gray-700 dark:text-gray-200">
                Category
              </label>
              <select
                defaultValue={""}
                name="category"
                required
                className="select w-full rounded-full focus:border-0 focus:outline-gray-300 dark:focus:outline-gray-600"
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Morning">Morning</option>
                <option value="Work">Work</option>
                <option value="Fitness">Fitness</option>
                <option value="Evening">Evening</option>
                <option value="Study">Study</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="label font-medium text-gray-700 dark:text-gray-200">
                Description
              </label>
              <textarea
                name="description"
                required
                rows="4"
                className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-300 dark:focus:outline-gray-600 h-[150px]"
                placeholder="Enter description"
              ></textarea>
            </div>

            {/* Reminder */}
            <div>
              <label className="label font-medium text-gray-700 dark:text-gray-200">
                Reminder Time
              </label>
              <input
                type="time"
                name="reminderTime"
                className="input w-full rounded-full focus:border-0 focus:outline-gray-300 dark:focus:outline-gray-600"
              />
            </div>

            {/* Image */}
            <div>
              <label className="label font-medium text-gray-700 dark:text-gray-200">
                Image URL (Optional)
              </label>
              <input
                type="text"
                name="image"
                placeholder="https://example.com/image.jpg"
                className="input w-full rounded-full focus:border-0 focus:outline-gray-300 dark:focus:outline-gray-600"
              />
            </div>

            {/* User Info */}
            <div>
              <label className="label font-medium text-gray-700 dark:text-gray-200">
                User Email
              </label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="input w-full rounded-full bg-gray-100 dark:bg-gray-800 focus:border-0 focus:outline-gray-300 dark:focus:outline-gray-600"
              />
            </div>

            <div>
              <label className="label font-medium text-gray-700 dark:text-gray-200">
                User Name
              </label>
              <input
                type="text"
                value={user.displayName || user.name}
                readOnly
                className="input w-full rounded-full bg-gray-100 dark:bg-gray-800 focus:border-0 focus:outline-gray-300 dark:focus:outline-gray-600"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`btn w-full text-white mt-6 rounded-full transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
              }`}
            >
              {loading ? "Adding..." : "Add Habit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHabitModal;
