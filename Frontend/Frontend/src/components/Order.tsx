import React, { useState } from 'react';

interface PlaceOrderProps {
  pizzaName: string;
  pizzaCount: number;
  totalAmount: number;
}

const PlaceOrder: React.FC<PlaceOrderProps> = ({ pizzaName, pizzaCount, totalAmount }) => {
  const [address, setAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim() === '') {
      alert('Please enter a valid address');
      return;
    }
    setOrderPlaced(true);
  };

  return (
    <div className="mt-10 p-6 bg-white rounded-lg shadow-xl max-w-md mx-auto border border-gray-200">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Place Your Order</h2>
      
      {orderPlaced ? (
        <div className="text-center text-gray-700">
          <h3 className="text-2xl font-bold text-green-600">Order Placed Successfully!</h3>
          <p className="mt-2">Pizza: <span className="font-medium">{pizzaName}</span></p>
          <p>Quantity: <span className="font-medium">{pizzaCount}</span></p>
          <p>Total Amount: <span className="font-medium">${totalAmount}</span></p>
          <p className="mt-4">Shipping to: <span className="font-medium">{address}</span></p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shipping Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full address"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            Place Order
          </button>
        </form>
      )}
    </div>
  );
};

export default PlaceOrder;
