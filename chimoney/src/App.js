import { Routes, Route } from "react-router-dom";
import Checkout from "./Pages/Checkout";
import Products from "./Pages/Products";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>

  );
}

export default App;
