import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "./../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/usersApi";
import Loading from "../components/Loading";
import Message from "../components/LoadingError/Error";
import { setLogin } from "../features/users/usersSlice";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const { mutate, isError, error, isLoading, data } = useMutation(
    ["login"],
    () => registerUser(name, number, email, password)
  );

  useEffect(() => {
    if (data) {
      const { createdAt, email, isAdmin, name, number, token, _id } = data;
      dispatch(setLogin({ name, email, isAdmin, token, _id }));
    }
  }, [data]);

  // useEffect(() => {
  //   if (user.token) {
  //     if (redirect === "/") {
  //       navigate("/");
  //     } else {
  //       navigate(`/${redirect}`);
  //     }
  //   }
  // }, [user.token]);

  window.scrollTo(0, 0);

  const submitHandler = (e) => {
    e.preventDefault();
    mutate(
      { name, number, email, password },
      {
        onSuccess: () => {
          if (redirect === "/") {
            navigate("/");
          } else {
            navigate(`/${redirect}`);
          }
        },
      }
    );
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && (
          <Message variant="alert-danger">
            {error.response.data.message}
          </Message>
        )}
        {isLoading && <Loading />}

        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="text"
            placeholder="Nombre de Usuario"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
          <input
            type="number"
            required
            placeholder="Telefono"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            autoComplete="off"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />

          <button type="submit">Register</button>
          <p>
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Ya tengo cuenta <strong>iniciar sesión</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
