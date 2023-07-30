import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./../components/Header";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../api/orderApi";
import { useMutation } from "@tanstack/react-query";
import { newOrder } from "../features/order/orderSlice";
import { addToCart, clearCart } from "../features/cart/cartSlice";
import Message from "../components/LoadingError/Error";
import Footer from "../components/Footer";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  window.scrollTo(0, 0);
  const cart = useSelector((state) => state.cart);
  // const orders = useSelector((state) => state.order);

  const { mutate, error, isLoading, data, success, isError } = useMutation(
    ["creteOrder"],
    () => createOrder(order)
  );

  const placeOrderHandler = (e) => {
    e.preventDefault();
    mutate(order);
  };

  useEffect(() => {
    if (data) {
      navigate(`/order/${data?._id}`);
      dispatch(clearCart());
    }
  }, [data]);

  useEffect(() => {
    dispatch(
      newOrder({
        data,
      })
    );
  }, [data, dispatch]);

  // Calculate Price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  const shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 0);
  // cart.taxPrice = addDecimals(Number((0.16 * cart.itemsPrice).toFixed(2)));
  const taxPrice = 0;
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const order = {
    orderItems: cart.cartItems,
    // shippingAddress: cart.shippingAddress,
    // paymentMethod: cart.paymentMethod,
    itemsPrice: itemsPrice,
    shippingPrice: shippingPrice,
    taxPrice: taxPrice,
    totalPrice: totalPrice,
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Customer</strong>
                </h5>
                <p>Admin Doe</p>
                <p>admin@example.com</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          {/* <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Order info</strong>
                </h5>
                <p>Shipping: Tanzania</p>
                <p>Pay method: Paypal</p>
              </div>
            </div>
          </div> */}
          {/* 3 */}
          {/* <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Deliver to</strong>
                </h5>
                <p>
                  Address: Arusha Tz, Ngaramtoni Crater, P.O BOX 1234 Arusha Tz
                </p>
              </div>
            </div>
          </div> */}
        </div>

        <div className="row order-products justify-content-between mb-5">
          <div className="col-lg-8">
            {cart.cartItems.length === 0 ? (
              <Message variant="alert-info mt-5">Tu carrito esta vacío</Message>
            ) : (
              <>
                {cart.cartItems.map((item, index) => (
                  <div className="order-product row" key={index}>
                    <div className="col-md-3 col-6">
                      <img src={item.photo} alt={item.name} />
                    </div>
                    <div className="col-md-5 col-6 d-flex align-items-center">
                      <Link to={`/products/${item.product}`}>
                        <h6>{item.name}</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                      <h4>CANTIDAD</h4>
                      <h6>{item.qty}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                      <h4>SUBTOTAL</h4>
                      <h6>${item.qty * item.price}</h6>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* total */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Productos</strong>
                  </td>
                  <td>${itemsPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Delivery</strong>
                  </td>
                  <td>${shippingPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Impuesto</strong>
                  </td>
                  <td>${taxPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>${totalPrice}</td>
                </tr>
              </tbody>
            </table>
            {cart.cartItems.length === 0 ? null : (
              <button type="submit" onClick={placeOrderHandler}>
                Realizar Pedido
              </button>
            )}
            {error && (
              <div className="my-3 col-12">
                <Message variant="alert-danger">{error.message}</Message>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlaceOrderScreen;

// actualemnte funciona bien , pero al colocarle la funcion de vaciar carrito y pasar de pagina , he tenido inconvenientes ...guardado 23/07
