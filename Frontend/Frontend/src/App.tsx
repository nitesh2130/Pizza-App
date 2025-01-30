// import { useState } from 'react'
import { Register } from "./components/Register";
import Order from "./components/Order";
import Cart from "./components/Cart";
import Home from "./components/Home";
import { Login } from "./components/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0)

  return (
    // <Demo />
    // <Router>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/order"
        element={<Order pizzaName={""} pizzaCount={0} totalAmount={0} />}
      />
    </Routes>
    // </Router>
  );
}

export default App;
