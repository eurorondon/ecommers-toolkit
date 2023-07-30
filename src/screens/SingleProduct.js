import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProductReview, getProudct } from "../api/productsApi";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "../features/products/productsSlice";
import Message from "../components/LoadingError/Error";
import Footer from "../components/Footer";
import Rating from "../components/homeComponents/Rating";
import moment from "moment";
import "moment/locale/es"; // Importa el idioma español de Moment.js

const SingleProduct = ({ match }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const userInfo = useSelector((state) => state.user);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  // const [showError, setshowError] = useState(false);

  const {
    mutate,
    data: res,
    isLoading: loadingCreateReview,
    error: errorCreateReview,
  } = useMutation(["createProductReview"], () =>
    createProductReview(id, { rating, comment })
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const submitHandler = (e) => {
    e.preventDefault();
    mutate(id, { rating, comment });
  };

  useEffect(() => {
    queryClient.invalidateQueries(["product", id]);
    setRating("");
    setComment("");
  }, [res]);

  const product = data;

  return (
    <div className="bg-white">
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
        <>
          <div className="container single-product ">
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
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
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
                <h6 className="mb-3">RESEÑAS</h6>
                {product.reviews.length === 0 && (
                  <Message variant={"alert-info mt-3"}>Sin Reseñas</Message>
                )}
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                  >
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <span>{moment(review.createdAt).calendar()}</span>
                    <div className="alert alert-info mt-3">
                      {review.comment}
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-6">
                <h6>ESCRIBE UNA OPINIÓN SOBRE EL PRODUCTO </h6>
                <div className="my-4">
                  {loadingCreateReview && <Loading />}
                  {errorCreateReview && (
                    <Message variant="alert-danger">
                      {errorCreateReview.response.data.message}
                    </Message>
                  )}
                </div>
                {userInfo?.token ? (
                  <form onSubmit={submitHandler}>
                    <div className="my-4">
                      <strong>Califica</strong>
                      <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      >
                        <option value="">Selecciona...</option>
                        <option value="1">1 - Pobre</option>
                        <option value="2">2 - Justo</option>
                        <option value="3">3 - Bueno</option>
                        <option value="4">4 - Muy Bueno</option>
                        <option value="5">5 - Excelente</option>
                      </select>
                    </div>
                    <div className="my-4">
                      <strong>Comentario</strong>
                      <textarea
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <button
                        disabled={loadingCreateReview}
                        className="col-12 bg-black border-0 p-3 rounded text-white"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="my-3">
                    <Message variant={"alert-warning"}>
                      Por favor
                      <Link to="/login">
                        " <strong>Login</strong> "
                      </Link>
                      para escribir un comentario
                    </Message>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default SingleProduct;
