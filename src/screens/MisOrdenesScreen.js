import React from "react";
// import { format, parseISO, isValid } from "date-fns";
// import { es } from "date-fns/locale"; // Importa el módulo de idioma español
import moment from "moment";
import "moment/locale/es"; // Importa el idioma español de Moment.js

import Header from "../components/Header";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import Orders from "./../components/profileComponents/Orders";
import { useSelector } from "react-redux";
import { listMyOrders } from "../api/orderApi";
import { useQuery } from "@tanstack/react-query";

const MisOrdenesScreen = () => {
  window.scrollTo(0, 0);
  const userInfo = useSelector((state) => state.user);
  moment.locale("es"); // Configura el idioma español en Moment.js

  const {
    isLoading,
    data: orders,
    isError,
    error,
  } = useQuery(["ListMyOrders"], () => listMyOrders());

  let formattedDate = "";
  if (moment(userInfo.createdAt).isValid()) {
    formattedDate = moment(userInfo.createdAt).format("MMMM D, YYYY"); // Utiliza Moment.js para formatear la fecha
  }

  return (
    <>
      <Header />
      <div className="container mt-lg-5 mt-3">
        <div className="row align-items-start">
          <div className="col-lg-4 p-0 shadow ">
            <div className="author-card pb-0 pb-md-3">
              <div className="author-card-cover"></div>
              <div className="author-card-profile row">
                <div className="author-card-avatar col-md-5">
                  <img src="./images/user.png" alt="userprofileimage" />
                </div>
                <div className="author-card-details col-md-7">
                  <h5 className="author-card-name mb-2">
                    <strong>{userInfo.name}</strong>
                  </h5>
                  <span className="author-card-position">
                    <>Joined {moment(userInfo.createdAt).format("LL")}</>
                  </span>
                </div>
              </div>
            </div>
            <div className="wizard pt-3 ">
              <div class="d-flex align-items-start">
                <div
                  class="nav align-items-start flex-column col-12 nav-pills me-3 "
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    class="nav-link d-flex justify-content-between active"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Lista de pedidos
                    <span className="badge2">{orders ? orders.length : 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* panels */}
          <div
            class="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
            id="v-pills-tabContent"
          >
            <div
              class="tab-pane fade show active"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <Orders orders={orders} loading={isLoading} error={error} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MisOrdenesScreen;
