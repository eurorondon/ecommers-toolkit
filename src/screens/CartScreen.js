import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProudct } from "../api/productsApi";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/LoadingError/Error";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

const CartScreen = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const qty = Number(searchParams.get("qty")) || 1;

  const { isLoading, data, isError, error } = useQuery(["product", id], () =>
    getProudct(id)
  );

  useEffect(() => {
    if (data) {
      dispatch(
        addToCart({
          product: data?._id,
          name: data.name,
          image: data.image,
          price: data?.price,
          countInStock: data.countInStock,
          qty,
          photo: data.photo[0].url,
        })
      );
    }
  }, [data]);

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  const removeFromCartHandle = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkOutHandler = () => {
    navigate("/login?redirect=placeorder");
  };

  return (
    <>
      <Header />

      {isLoading ? (
        <div style={{ marginTop: "200px" }}>
          <Loading />
        </div>
      ) : isError ? (
        <div
          className="container pt-32 bg-slate-200"
          style={{ marginTop: "200px" }}
        >
          <Message className="mt-32" variant="alert-danger">
            {error.message}
          </Message>
        </div>
      ) : (
        <div className="container">
          {cartItems.length === 0 ? (
            <div className=" alert alert-info text-center mt-3">
              Your cart is empty
              <Link
                className="btn btn-success mx-5 px-5 py-3"
                to="/"
                style={{
                  fontSize: "12px",
                }}
              >
                SHOPPING NOW
              </Link>
            </div>
          ) : (
            <div>
              <div className=" alert alert-info text-center mt-3">
                Total Cart Products
                <Link className="text-success mx-2" to="/cart">
                  ({cartItems.length})
                </Link>
              </div>
              {/* cartiterm */}
              {cartItems.map((item) => (
                <div className="cart-iterm row" key={item.product}>
                  <div
                    onClick={() => removeFromCartHandle(item.product)}
                    className="  remove-button d-flex justify-content-center align-items-center"
                  >
                    <i className="fas fa-times"></i>
                  </div>
                  <div className="cart-image col-md-3">
                    <img src={item.photo} alt={item.name} />
                  </div>
                  <div className="cart-text col-md-5 d-flex align-items-center">
                    <Link to={`/products/${item.product}`}>
                      <h4>{item.name}</h4>
                    </Link>
                  </div>
                  <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                    <h6>CANTIDAD</h6>
                    <select
                      value={item?.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart({
                            product: item.product,
                            qty: Number(e.target.value),
                          })
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                    <h6>PRECIO</h6>
                    <h4>${item.price}</h4>
                  </div>
                </div>
              ))}

              {/* End of cart iterms */}
              <div className="total">
                <span className="sub">total:</span>
                <span className="total-price">${total}</span>
              </div>
              <hr />
              <div className="cart-buttons d-flex align-items-center row">
                <Link to="/" className="col-md-6 ">
                  <button>Continue To Shopping</button>
                </Link>

                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkOutHandler}>Checkout</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <Footer />
    </>
  );
};

export default CartScreen;
