import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "./../components/Header";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/usersApi";
import { setLogin } from "../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.user);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { mutate, isError, error, isLoading, data } = useMutation(
    ["login"],
    () => loginUser(correo, password),
    {
      headers: config.headers,
    }
  );

  useEffect(() => {
    if (data) {
      const { createdAt, email, isAdmin, name, number, token, _id } = data;
      console.log(createdAt);
      dispatch(
        setLogin({ name, email, number, isAdmin, token, _id, createdAt })
      );
    }
  }, [data]);

  const submitHandler = (e) => {
    e.preventDefault();
    mutate({ correo, password });
  };

  useEffect(() => {
    if (user.token) {
      if (redirect === "/") {
        navigate("/");
      } else {
        navigate(`/${redirect}`);
      }
    }
  }, [submitHandler]);

  window.scrollTo(0, 0);

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {isError && (
          <div className="mt-4">
            <Message variant="alert-danger">
              {error.response.data.message}
            </Message>
          </div>
        )}
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="email"
            placeholder="Email"
            value={correo}
            // value="admin@gmail.com"
            onChange={(e) => setCorreo(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <p>
            <Link to={"/register"}>Create Account</Link>
          </p>
        </form>
        {isLoading && (
          <div className="my-5">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
