import { Routes, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Products from "./components/Products";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>

  );
}

export default App;
