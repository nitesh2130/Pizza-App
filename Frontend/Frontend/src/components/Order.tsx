import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center border border-gray-200">
        {/* Success Icon (SVG) */}
        <div className="flex justify-center">
          <svg
            className="h-16 w-16 text-green-500 animate-bounce"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12 2a10 10 0 100 20 10 10 0 000-20zM10 15.172l5.657-5.657a1 1 0 10-1.414-1.414L10 12.344l-2.243-2.243a1 1 0 10-1.414 1.414L10 15.172z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          Your delicious pizza is on the way! 🍕
        </p>

        {/* Button to Home */}
        <button
          onClick={() => navigate("/home")}
          className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
