import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProudct } from "../api/productsApi";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";

import { useDispatch, useSelector } from "react-redux";

const CartScreen = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const qty = Number(searchParams.get("qty")) || 1;
  // window.scrollTo(0, 0);

  const { isLoading, data, isError, error } = useQuery(["product", id], () =>
    getProudct(id)
  );

  useEffect(() => {
    if (data) {
      dispatch(addToCart({ data, qty }));
    }
  }, [data]);

  // if (isLoading) return <h1>Loading</h1>;

  const total = cartItems
    .reduce((a, i) => a + i.qty * i.data.price, 0)
    .toFixed(2);

  const removeFromCartHandle = (id) => {
    dispatch(removeFromCart(id));
  };

  console.log(cartItems);

  return (
    <>
      <Header />

      {/* Cart */}
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
                  onClick={() => removeFromCartHandle(item?.data?._id)}
                  className=" bg-dark remove-button d-flex justify-content-center align-items-center"
                >
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-3">
                  <img src={item.data.photo[0].url} alt={item.name} />
                </div>
                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link to={`/products/${item?.data?._id}`}>
                    <h4>{item?.data.name}</h4>
                  </Link>
                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>CANTIDAD</h6>
                  <select
                    value={item?.qty}
                    onChange={(e) =>
                      dispatch(
                        addToCart({
                          data: { _id: item.data?._id },
                          qty: Number(e.target.value),
                        })
                      )
                    }
                  >
                    {[...Array(item.data.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>PRECIO</h6>
                  <h4>${item.data.price}</h4>
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
                <button>
                  <Link to="/shipping" className="text-white">
                    Checkout
                  </Link>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartScreen;
