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
import SearchResults from "./screens/SearchResults";
import CategoriesResult from "./screens/CategoriesResults";
import ProfileScreen from "./screens/ProfileScreen";
import PaidScreen from "./screens/PaidScreen";
import MisOrdenesScreen from "./screens/MisOrdenesScreen";
import MiperfilScreen from "./screens/MiperfilScreen";
import CategoriaScreen from "./screens/CategoriaScreen";

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
        <Route path="/categorias" element={<CategoriaScreen />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route
          path="/profile"
          element={
            <PrivateRouter>
              <ProfileScreen />
            </PrivateRouter>
          }
        />

        <Route path="/cart/:id?" element={<CartScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search/:searchWord" element={<SearchResults />} />
        <Route path="/categories/:category" element={<CategoriesResult />} />
        <Route
          path="/placeorder"
          element={
            <PrivateRouter>
              <PlaceOrderScreen />
            </PrivateRouter>
          }
        />
        <Route
          path="/order/:id"
          element={
            <PrivateRouter>
              <OrderScreen />
            </PrivateRouter>
          }
        />
        <Route
          path="/paid/:id"
          element={
            <PrivateRouter>
              <PaidScreen />
            </PrivateRouter>
          }
        />
        <Route
          path="/misordenes"
          element={
            <PrivateRouter>
              <MisOrdenesScreen />
            </PrivateRouter>
          }
        />
        <Route
          path="/miperfil"
          element={
            <PrivateRouter>
              <MiperfilScreen />
            </PrivateRouter>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
