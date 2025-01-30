// import { useState } from 'react'
import { Register } from "./components/Register";
import { Demo } from "./pages/Demo";
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
      <Route path="/demo" element={<Demo />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    // </Router>
  );
}

export default App;
