import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex justify-center">
      <div className="container flex justify-center h-screen my-56">
        <div className="bg-white w-12 h-12 rounded-full border-4 border-t-4 border-t-black animate-spin border-gray-500"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
