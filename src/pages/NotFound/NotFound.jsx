import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4">
      <img
        src="https://i.postimg.cc/7L6djTH2/682-404-Error-Text-High-Res-Vector-Graphics.jpg"
        alt="404 Page Not Found"
        className="w-full max-w-lg mb-6 animate-pulse"
      />
      
      <button
        onClick={() => navigate("/")}
        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-cyan-600 transition transform hover:-translate-y-1"
      >
        Go back Home
      </button>
    </div>
  );
};

export default NotFound;
