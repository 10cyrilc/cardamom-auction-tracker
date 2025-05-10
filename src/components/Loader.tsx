import React from "react";

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-full flex-col">
        <div className="flex space-x-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
        </div>
        <p className="ml-3 text-emerald-600 font-medium">Loading...</p>
    </div>
);

export default LoadingSpinner;