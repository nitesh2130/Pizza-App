import React, { useState } from 'react';

interface Pizza {
  id: number;
  name: string;
  price: number;
  count: number;
}

const App: React.FC = () => {
  const [pizza, setPizza] = useState<Pizza>({
    id: 1,
    name: 'Margherita',
    price: 10,
    count: 0,
  });

  const handleIncreaseCount = () => {
    setPizza((prevPizza) => ({ ...prevPizza, count: prevPizza.count + 1 }));
  };

  const handleDecreaseCount = () => {
    if (pizza.count > 1) {
      setPizza((prevPizza) => ({ ...prevPizza, count: prevPizza.count - 1 }));
    }
  };

  const totalAmount = pizza.price * pizza.count;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Pizza Cart</h1>
        <div className="bg-gray-50 border border-gray-300 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-center">{pizza.name}</h3>
          <p className="text-center text-gray-600">Price: ${pizza.price}</p>
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={handleDecreaseCount}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              -
            </button>
            <span className="text-xl font-semibold">{pizza.count}</span>
            <button
              onClick={handleIncreaseCount}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              +
            </button>
          </div>
        </div>
        <div className="mt-6 text-center flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-gray-700">Total Amount: ${totalAmount}</h2>
          <button className='bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition'>Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default App;
