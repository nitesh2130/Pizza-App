import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const navigate = useNavigate();
  const apiUrlRegister = "http://localhost:3000/users/register";
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const redirectToRegister = () => {
    navigate("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { ...errors };

    // Basic validation
    let isValid = true;

    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    if (formData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
      isValid = false;
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      alert("Registration successful!");
      //   console.log(formData);

      const response = await axios.post(apiUrlRegister, formData);
      const data = response.data;
      console.log(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center py-10">
      <div className="w-full sm:w-96 bg-white p-8 rounded-lg shadow-lg border-2 border-indigo-500">
        <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
            />
            {errors.phoneNumber && (
              <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>
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
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Allready have an account?{" "}
          <button
            className="text-pink-500 font-medium hover:underline"
            onClick={redirectToRegister}
          >
            LogIn
          </button>
        </p>
      </div>
    </div>
  );
};
