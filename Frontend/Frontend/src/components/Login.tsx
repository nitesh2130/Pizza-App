import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate("/register");
  };
  const apiUrlLogin = "http://localhost:3000/users/login";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { ...errors };

    // Basic validation
    let isValid = true;

    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      alert("Login successful!");

      const response = await axios.post(apiUrlLogin, formData);
      const data = response.data;
      localStorage.setItem("accessToken", data.access_token);
      console.log(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 flex items-center justify-center py-10">
      <div className="w-full sm:w-96 bg-white p-8 rounded-lg shadow-lg border-2 border-blue-500">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-md hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <button
            className="text-pink-500 font-medium hover:underline"
            onClick={redirectToLogin}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};
