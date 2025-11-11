const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-20 h-20 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
