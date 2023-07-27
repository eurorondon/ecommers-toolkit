import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem } from "@mui/material";
import { LocationOn, PersonOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../features/users/usersSlice";
import { setSearch } from "../features/products/productsSlice";

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.user);
  const [keyword, setKeyword] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    dispatch(setLogin({}));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      // setCurrentPage(0);
    } else {
      navigate("/");
    }
    // dispatch(setSearch(keyword));
  };

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
      {/* Top Header */}
      <div className="Announcement ">
        <div className="container">
          <div className="row">
            {/* <div className="col-md-6 d-flex align-items-center display-none">
              <p>+255 768 356 890</p>
              <p>info@zpunet.com</p>
            </div> */}
            {window.innerWidth < 768 ? (
              <p
                className="text-white text-center"
                style={{ fontSize: "0.7rem" }}
              >
                <LocationOn style={{ fontSize: "0.9rem" }} />
                Barquisimeto- Edo, Lara
              </p>
            ) : (
              <p
                className="text-white text-center"
                style={{ fontSize: "1rem" }}
              >
                <LocationOn />
                Carrera23, calles 37 y 38, Barquisimeto - Lara
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Header */}
      <div
        className="header"
        style={{
          backgroundColor: "#040915",
        }}
      >
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header pb-2">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <div>
                    <MenuIcon
                      aria-controls="menu"
                      aria-haspopup="true"
                      onClick={handleMenuClick}
                      color="white"
                      className="text-white"
                      style={{ fontSize: "2.2rem" }}
                    >
                      <MenuIcon className="text-white" />
                    </MenuIcon>
                    <Menu
                      id="menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      {/* Agrega aquí los elementos de menú desplegable */}
                      <MenuItem className="menu-item" onClick={handleMenuClose}>
                        Item 1
                      </MenuItem>
                      <MenuItem className="menu-item" onClick={handleMenuClose}>
                        Item 2
                      </MenuItem>
                      <MenuItem
                        className="menu-item"
                        onClick={handleMenuClose}
                        style={{ backgroundColor: "" }}
                      >
                        Item 3
                      </MenuItem>
                    </Menu>
                  </div>
                  <Link className="navbar-brand ms-3" to="/">
                    <img alt="logo" src="/images/logo.png" />
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle text-white"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        fontSize: "1.3rem",
                      }}
                    >
                      <PersonOutline style={{ fontSize: "1.8rem" }} />
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>

                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                  <Link to="/cart" className="cart-mobile-icon text-white">
                    <i
                      className="fas fa-shopping-bag me-3"
                      style={{ fontSize: "1.1rem" }}
                    ></i>
                    <span className="badge" style={{ fontSize: "0.8rem" }}>
                      {cartItems.length}
                    </span>
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form onSubmit={submitHandler} className="input-group">
                    <input
                      type="search"
                      className="form-control rounded-left search"
                      placeholder="Search"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-button ">
                      search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header py-2">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/logo.png" />
                </Link>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center">
                <form onSubmit={submitHandler} className="input-group">
                  <input
                    type="search"
                    className="form-control rounded-left search"
                    placeholder="Search"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="search-button"
                    style={{ backgroundColor: "#1cb803" }}
                  >
                    search
                  </button>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {userInfo.token ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hi, {userInfo.name}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>

                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <Link to="/register" className=" button  my-auto ">
                      <span className="text-white"> Registrar</span>
                    </Link>
                    <Link to="/login" className=" button my-auto text-white">
                      Login
                    </Link>
                  </div>
                )}

                <Link to="/cart">
                  <i
                    className="fas fa-shopping-bag me-3 text-white"
                    style={{ fontSize: "1.1rem" }}
                  ></i>
                  <span className="badge">{cartItems.length}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="text-white pc-header py-2 "
        style={{ backgroundColor: "#1A2339" }}
      >
        <div className="container d-flex justify-content-start gap-5">
          <h5>Categorias</h5>
          <h5>Contacto</h5>
          <h5>Top Seller</h5>
        </div>
      </div>
    </div>
  );
};

export default Header;
