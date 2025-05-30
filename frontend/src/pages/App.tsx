import { Routes, Route, useNavigate } from "react-router-dom";
import Products from './Products'
import Cart from './Cart'
import Orders from './Orders'
import Login from './Login'
import "./App.css";

function App() {
  const navigate = useNavigate();
  
  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen min-w-screen flex flex-col items-center justify-center p-4">
          <h1>THE POTION SHOP</h1>
          <button className="main-button" onClick={() => navigate('/login')}>
            Entrar
          </button>
        </div>
      } />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;