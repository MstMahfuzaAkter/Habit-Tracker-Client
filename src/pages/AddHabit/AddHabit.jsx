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
    <LoadingSpinner></LoadingSpinner>

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
      const res = await fetch("https://habit-tracker-server-coral.vercel.app/habit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

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
    <div>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="card border border-gray-200 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
        <div className="card-body p-6 relative">
          <h2 className="text-2xl font-bold text-center mb-6">Add New Habit</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Habit Title */}
            <div>
              <label className="label font-medium">Habit Title</label>
              <input
                type="text"
                name="title"
                required
                className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                placeholder="Enter habit title"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="label font-medium">Category</label>
              <select
                defaultValue={""}
                name="category"
                required
                className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
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
              <label className="label font-medium">Description</label>
              <textarea
                name="description"
                required
                rows="4"
                className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[150px]"
                placeholder="Enter description"
              ></textarea>
            </div>

            {/* Reminder Time */}
            <div>
              <label className="label font-medium">Reminder Time</label>
              <input
                type="time"
                name="reminderTime"
                className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="label font-medium">Image URL (Optional)</label>
              <input
                type="text"
                name="image"
                placeholder="https://example.com/image.jpg"
                className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              />
            </div>

            {/* User Email */}
            <div>
              <label className="label font-medium">User Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="input w-full rounded-full bg-gray-100 focus:border-0 focus:outline-gray-200"
              />
            </div>

            {/* User Name */}
            <div>
              <label className="label font-medium">User Name</label>
              <input
                type="text"
                value={user.displayName || user.name}
                readOnly
                className="input w-full rounded-full bg-gray-100 focus:border-0 focus:outline-gray-200"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`btn w-full text-white mt-6 rounded-full ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
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
