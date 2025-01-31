import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

interface Pizza {
  id: number;
  pizzaBasePrice: number;
  userId: number;
  ingredientName: string[];
  ingredientPrice: number;
  createdAt: string;
  updatedAt: string;
}

const App: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [orderLoading, setOrderLoading] = useState<{ [key: number]: boolean }>(
    {}
  );

  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:3000/pizza";
  const STATIC_ADDRESS = "123 Pizza Street, Pizza City - 12345"; // Static address for all orders

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      toGetPizza();
    }
  }, [accessToken, navigate]);

  const toGetPizza = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/veiwPizzaData/${userId}`
      );
      setPizzas(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching pizza data:", error);
      setError("Failed to load your cart items. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (pizzaId: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/${pizzaId}`);
      // Refresh the pizza list
      await toGetPizza();
    } catch (error) {
      console.error("Error deleting pizza:", error);
      setError("Failed to delete pizza. Please try again.");
    }
  };

  const handleCheckout = async (orderData: any, pizzaId: number) => {
    const pizza = pizzas.find((p) => p.id === pizzaId);
    if (!pizza) {
      alert("Pizza not found");
      return;
    }

    //message confirmation for the Order is place successfully
    const confirmMessage = `
Order Summary:
- Custom Pizza #${pizzaId}: ₹${pizza.ingredientPrice}

Total Amount: ₹${pizza.ingredientPrice}
Delivery Address: ${STATIC_ADDRESS}

Do you want to place this order?`;

    if (window.confirm(confirmMessage)) {
      try {
        setOrderLoading((prev) => ({ ...prev, [pizzaId]: true }));

        // Place order
        await axios.post("http://localhost:3000/order/orderPlace", orderData);

        // Delete from cart
        await axios.delete(`${API_BASE_URL}/${pizzaId}`);

        // Refresh the cart
        await toGetPizza();

        alert("Order placed successfully!");
        // Navigate to orders page
        navigate("/orders");
      } catch (error: any) {
        console.error("Error placing order:", error);
        alert(
          error.response?.data?.message ||
            "Failed to place order. Please try again."
        );
      } finally {
        setOrderLoading((prev) => ({ ...prev, [pizzaId]: false }));
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Your Pizza Cart
              </h1>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {pizzas.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-5xl mb-4">🍕</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Looks like you haven't added any pizzas yet.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {pizzas.map((pizza) => (
                  <div
                    key={pizza.id}
                    className="bg-white shadow overflow-hidden sm:rounded-lg"
                  >
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Custom Pizza #{pizza.id}
                          </h3>
                          <div className="mt-2 max-w-xl text-sm text-gray-500">
                            <p>Base Price: ₹{pizza.pizzaBasePrice}</p>
                            <p>
                              Ingredients:{" "}
                              {pizza.ingredientName.join(", ") ||
                                "No ingredients"}
                            </p>
                            <p className="font-semibold">
                              Total Price: ₹{pizza.ingredientPrice}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleCheckout(pizza, pizza.id)}
                            disabled={orderLoading[pizza.id]}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                              orderLoading[pizza.id]
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-green-600 text-white hover:bg-green-700"
                            }`}
                          >
                            {orderLoading[pizza.id]
                              ? "Ordering..."
                              : "Checkout"}
                          </button>
                          <button
                            onClick={() => handleDelete(pizza.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
