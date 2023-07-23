import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import "./responsive.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./screens/Home";
import SingleProduct from "./screens/SingleProduct";
import CartScreen from "./screens/CartScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { Amplify, Auth } from "aws-amplify";
import { Button, Heading, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

//esto se usa para que no se borre el usuario al refrescar  y tambien
import awsExports from "./aws-exports";
import PrivateRouter from "./PrivateRouter";
import { setLogin } from "./features/users/usersSlice";
import OrderScreen from "./screens/OrderScreen";
Amplify.configure(awsExports);

function App() {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products);
  if (productsState.productList.length > 0) {
    // console.log(productsState);
  }

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      dispatch(setLogin(userInfo));
    }
  }, [dispatch, setLogin]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/cart/:id?" element={<CartScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/placeorder"
          element={
            <PrivateRouter>
              <PlaceOrderScreen />
            </PrivateRouter>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
