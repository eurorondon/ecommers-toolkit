import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../LoadingError/Error";
import Toast from "./../LoadingError/Toast";
import Loading from "./../LoadingError/Loading";
import { toast } from "react-toastify";
import { updateUser } from "../../api/usersApi";
import { useMutation } from "@tanstack/react-query";
import { setLogin, updateLogin } from "../../features/users/usersSlice";
// import { updateUserProfile } from "../../Redux/Actions/userActions";
// index.js o App.js
// import "react-toastify/dist/ReactToastify.css";

const ProfileTabs = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastId = React.useRef(null);

  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  // const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  // const { loading: updateLoading } = userUpdateProfile;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setNumber(user.number);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const { mutate, isError, error, isLoading, data } = useMutation(
    ["updateUser"],
    () => updateUser(name, number, email, password)
  );

  const submitHandler = (e) => {
    e.preventDefault();
    // Password match
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Password does not match", Toastobjects);
      }
    } else {
      mutate(
        { name, number, email, password },
        {
          onSuccess: (data) => {
            const { name, number, email, isAdmin, token, _id, createdAt } =
              data;

            dispatch(
              setLogin({
                name,
                email,
                number,
                isAdmin,
                token,
                _id,
                createdAt,
              })
            );
          },
        }
      );

      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Profile Updated", Toastobjects);
      }
    }
  };
  return (
    <>
      <Toast />
      {/* {error && <Message variant="alert-danger">{error}</Message>} */}
      {/* {loading && <Loading />} */}
      {/* {updateLoading && <Loading />} */}
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">Usuario</label>
            <input
              className="form-control"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">Telefono</label>
            <input
              className="form-control"
              type="text"
              required
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-email">Email </label>
            <input
              className="form-control"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">Nueva contraseña</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">Confirmar contraseña</label>
            <input
              className="form-control"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Actualizar Perfil</button>
      </form>
    </>
  );
};

export default ProfileTabs;
