import React from "react";
import { FaBrain, FaSmile, FaClock, FaChartLine } from "react-icons/fa";

const benefits = [
    {
        icon: <FaBrain size={30} className="text-blue-500" />,
        title: "Better Focus",
        description:
            "Developing good habits helps you concentrate better on tasks, improving productivity and mental clarity.",
    },
    {
        icon: <FaSmile size={30} className="text-green-500" />,
        title: "Reduced Stress",
        description:
            "Consistent routines reduce uncertainty and mental clutter, lowering stress and anxiety levels naturally.",
    },
    {
        icon: <FaClock size={30} className="text-yellow-500" />,
        title: "Time Management",
        description:
            "Building habits teaches you discipline and helps you manage your daily schedule efficiently, saving time.",
    },
    {
        icon: <FaChartLine size={30} className="text-red-500" />,
        title: "Personal Growth",
        description:
            "Regularly practicing positive habits improves skills, boosts confidence, and fosters overall personal growth.",
    },
];

const WhyBuildHabits = () => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-10">Why Build Habits?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition"
                        >
                            <div className="mb-4">{benefit.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                            <p className="text-gray-600">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyBuildHabits;
