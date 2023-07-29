import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProudct } from "../api/productsApi";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "../features/products/productsSlice";
import Message from "../components/LoadingError/Error";
import Footer from "../components/Footer";
// import { Link } from "react-router-dom";
// import Rating from "../components/homeComponents/Rating";
// import Message from "./../components/LoadingError/Error";
// import products from "../data/Products";

const SingleProduct = ({ match }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  // const [showError, setshowError] = useState(false);

  // Ejecutamos la llamada a la API, react-query nos ayuda con el estado de la petición
  const { isLoading, data, isError, error } = useQuery(["product", id], () =>
    getProudct(id)
  );

  // enviamos los datos extraídos de la API a REDUX
  useEffect(() => {
    if (data) {
      dispatch(setProductDetails(data));
    }
  }, [data, dispatch]);

  const AddToCartHandle = (e) => {
    e.preventDefault();
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const product = data;

  return (
    <>
      <Header />
      {/* <button className="mb-32" onClick={handleGoBack}>
        Volver
      </button> */}
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
        <div className="container single-product">
          <div className="row">
            <div className="col-md-6">
              <div className="single-image">
                <img src={product?.photo[0].url} alt={product.name} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="product-dtl">
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                </div>
                <p>{product.description}</p>

                <div className="product-count col-lg-7 ">
                  <div className="flex-box d-flex justify-content-between align-items-center">
                    <h6>Price</h6>
                    <span>${product.price}</span>
                  </div>
                  <div className="flex-box d-flex justify-content-between align-items-center">
                    <h6>Status</h6>
                    {product.countInStock > 0 ? (
                      <span>In Stock</span>
                    ) : (
                      <span>unavailable</span>
                    )}
                  </div>
                  <div className="flex-box d-flex justify-content-between align-items-center">
                    <h6>Reviews</h6>
                  </div>
                  {product.countInStock > 0 ? (
                    <>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Cantidad</h6>
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={AddToCartHandle}
                        className="round-black-btn"
                      >
                        Añadir al Carrito
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* RATING */}
          <div className="row my-5">
            <div className="col-md-6">
              <h6 className="mb-3">REVIEWS</h6>
              {/* <Message variant={"alert-info mt-3"}>No Reviews</Message> */}
              <div className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
                <strong>Admin Doe</strong>
                {/* <Rating /> */}
                <span>Jan 12 2021</span>
                <div className="alert alert-info mt-3">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's.
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h6>WRITE A CUSTOMER REVIEW</h6>
              <div className="my-4"></div>

              <form>
                <div className="my-4">
                  <strong>Rating</strong>
                  <select className="col-12 bg-light p-3 mt-2 border-0 rounded">
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>
                <div className="my-4">
                  <strong>Comment</strong>
                  <textarea
                    row="3"
                    className="col-12 bg-light p-3 mt-2 border-0 rounded"
                  ></textarea>
                </div>
                <div className="my-3">
                  <button className="col-12 bg-black border-0 p-3 rounded text-white">
                    SUBMIT
                  </button>
                </div>
              </form>
              <div className="my-3">
                {/* <Message variant={"alert-warning"}>
                Please{" "}
                <Link to="/login">
                  " <strong>Login</strong> "
                </Link>{" "}
                to write a review{" "}
              </Message> */}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default SingleProduct;
