import { useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";

function App() {
  const productsState = useSelector((state) => state.products);
  if (productsState.productList.length > 0) {
    // console.log(productsState);
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
