import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewProduct from "./components/newProduct/index.js";
import Products from "./components/products/index.js";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        {/*<Route  path="/products/:id" element={<UpdateProduct/>} />*/}
        <Route path="/products/new" element={<NewProduct />} />
        {/*<Route  path="/products" element={<Products/>} />*/}
      </Routes>
    </Router>
  );
}
export default App;
