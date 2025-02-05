import axios from "axios";
import { Key, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PizzaApp = () => {
  const [price, setPrice] = useState(20);
  const [ingredientData, setIngredientData] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  //   const [pizzaData, setPizzaData] = useState({});

  const navigate = useNavigate();
  const apiUrlToSavePizza = "http://localhost:3000/pizza/select";
  const apiUrlGetIngredient = "http://localhost:3000/pizza/";
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  async function apiIngredient() {
    const response = await axios.get(apiUrlGetIngredient);
    setIngredientData(response.data);
  }

  useEffect(() => {
    apiIngredient();
  }, []);

  const toggleIngredient = (ingredient: {
    ingredientItem: string;
    ingredientPrice: number;
  }) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient.ingredientItem)
        ? prev.filter((item) => item !== ingredient.ingredientItem)
        : [...prev, ingredient.ingredientItem]
    );
  };

  const handleSubmit = async () => {
    if (!accessToken) {
      navigate("/login");
    } else {
      const pizzaData = {
        ingredientName: selectedIngredients,
        pizzaBasePrice: price,
        userId: userId,
      };
      // This we will be handle the submitted ingredients
      console.log("Selected Ingredients:", selectedIngredients);
      const response = await axios.post(apiUrlToSavePizza, pizzaData, {
        headers: {
          Authorization: "Bearer accessToken",
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      const pizzaId = response.data.id;
      console.log(pizzaId);
      localStorage.setItem("pizzaData", response.data);
      navigate("/cart");

      // Optionally, you can also alert the user about the submission
      alert(`Ingredients submitted: ${selectedIngredients.join(", ")}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Navbar */}
      <nav className="w-full bg-red-500 text-white text-center py-4 text-2xl font-bold">
        PIZZA
      </nav>

      {/* Heading Text */}
      <div className="text-center mt-8">
        <h1 className="text-3xl font-semibold">You want to Order Pizza,</h1>
        <h2 className="text-2xl text-gray-700 mt-2">Let's Make your Pizza</h2>
      </div>

      {/* Pizza Images and Prices */}
      <div className="mt-6 flex flex-col items-center">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1617470702892-e01504297e84?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Small Pizza"
              className="w-40 h-40 object-cover rounded-full shadow-lg"
            />
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1617470702892-e01504297e84?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Medium Pizza"
              className="w-48 h-48 object-cover rounded-full shadow-lg"
            />
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1617470702892-e01504297e84?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Large Pizza"
              className="w-56 h-56 object-cover rounded-full shadow-lg"
            />
          </div>
        </div>
        <div className="flex gap-4 mt-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            onClick={() => setPrice(20)}
          >
            Select Small - ₨ 20
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            onClick={() => setPrice(30)}
          >
            Select Medium - ₨ 30
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            onClick={() => setPrice(45)}
          >
            Select Large - ₨ 45
          </button>
        </div>
      </div>

      {/* Display Selected Price */}
      <div className="mt-6 text-lg font-semibold">
        <p>Selected Pizza Price: ₨ {price}</p>
      </div>

      {/* Ingredients Section */}
      <div className="mt-8 w-full max-w-10xl bg-gray-200 p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Select Ingredients
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {ingredientData.map(
            (
              ingredient: {
                ingredientPrice: number;
                ingredientImage: string;
                ingredientItem: string;
                image?: any;
                name: any;
                price: any;
              },
              index: Key | null | undefined
            ) => (
              <div
                key={index}
                className="flex items-center flex-col p-6 border border-gray-300 rounded-sm hover:shadow-xl cursor-pointer transition"
              >
                {/* Image of ingredient */}
                <img
                  src={ingredient.ingredientImage}
                  alt={ingredient.ingredientItem}
                  className="w-24 h-24 mr-4 object-cover rounded-full"
                />
                {/* Ingredient name and price */}
                <div className="flex-grow">
                  <span className="font-medium text-lg">
                    {ingredient.ingredientItem} - ₨ {ingredient.ingredientPrice}
                  </span>
                </div>
                {/* Checkbox for selecting */}
                <input
                  type="checkbox"
                  className="w-6 h-6"
                  checked={selectedIngredients.includes(
                    ingredient.ingredientItem
                  )}
                  onChange={() => toggleIngredient(ingredient)}
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          onClick={handleSubmit}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default PizzaApp;
