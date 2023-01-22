import { Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";


function App() {




  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/cart" element={<ShoppingCart />} />
    </Routes>

  );
}

export default App;
