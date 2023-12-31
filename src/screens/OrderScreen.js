import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./../components/Header";
import Message from "./../components/LoadingError/Error";
import Loading from "./../components/LoadingError/Loading";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderDetails, payOrder } from "../api/orderApi";
import Footer from "../components/Footer";

// import { PayPalButton } from "react-paypal-button-v2";

const OrderScreen = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [image, setImage] = useState([]);
  const { email } = useSelector((state) => state.user);
  const [comprobantePago, setComprobantePago] = useState(null);

  const { id } = useParams();
  const orderId = id;
  const userLogin = useSelector((state) => state.userLogin);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    isLoading,
    data: testing,
    isError,
    error,
  } = useQuery(
    ["orderDetails"], // Incluir el parámetro 'page' en el array de dependencias de la queryKey
    () => orderDetails(id) // Pasar una función anónima que invoque getProudcts con el parámetro page
  );

  const order = testing;

  const {
    mutate,
    data,
    isLoading: isUploading,
  } = useMutation(["payorder"], () => payOrder(orderId, order, email, image));

  const submitHandler = (e) => {
    e.preventDefault();
    mutate(orderId, order, email, image, {
      onSuccess: (data) => {
        // Actualiza el estado con los datos devueltos por la mutación
        setComprobantePago(data);
        // Invalida la consulta "orderDetails" para volver a obtener los datos
        queryClient.invalidateQueries("orderDetails");
        // navigate(`/paid/${data?._id}`);
      },
    });
  };

  // Efecto que se ejecutará cada vez que cambie la respuesta de la mutación
  useEffect(() => {
    if (data) {
      const id = data.result.data._id;
      setComprobantePago(data.data?.comprobantePago);
      queryClient.invalidateQueries("orderDetails");
      navigate(`/paid/${id}`);
    }
  }, [data]);

  // const isUploading = true;

  return (
    <>
      <Header />

      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
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
                <p>
                  <a href={`mailto:admin@example.com`}>admin@example.com</a>
                </p>
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

                <div className="bg-info p-2 col-12">
                  <p className="text-white text-center text-sm-start">
                    Paid on Jan 12 2021
                  </p>
                </div>
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
                <div className="bg-danger p-1 col-12">
                  <p className="text-white text-center text-sm-start">
                    Not Delivered
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Tabla de order de productos */}
      <div className="row order-products justify-content-between  container mx-auto ">
        <div className="col-lg-8  ">
          {order?.orderItems ? (
            <>
              {order.orderItems.map((item, index) => (
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
                    <h4>QUANTITY</h4>
                    <h6>{item.qty}</h6>
                  </div>
                  <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                    <h4>SUBTOTAL</h4>
                    <h6>${item.qty * item.price}</h6>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <Message variant="alert-info mt-5">Tu pedido está vacío</Message>
          )}
        </div>
        {/* total */}
        {isLoading ? (
          <Loading />
        ) : (
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order ">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Productos</strong>
                  </td>
                  <td>${order.itemsPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Delivery</strong>
                  </td>
                  <td>${order.shippingPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Impuesto</strong>
                  </td>
                  <td>${order.taxPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>${order.totalPrice}</td>
                </tr>
              </tbody>
            </table>

            {comprobantePago || order.comprobantePago ? (
              <div className="my-1 mx-auto">
                <p>Tu comprobante ha sido cargado con exito</p>

                <button>ir a Whatsapp</button>
              </div>
            ) : isUploading ? (
              <>
                <div className="py-5  " style={{ width: "100%" }}>
                  <Loading className="py-5" />
                </div>
              </>
            ) : (
              <div className="">
                <form
                  action=""
                  style={{ maxWidth: "250px" }}
                  onSubmit={submitHandler}
                >
                  <input
                    className="form-control mt-3"
                    type="file"
                    name="image"
                    multiple
                    required
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <button>Subir Comprobante</button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderScreen;
