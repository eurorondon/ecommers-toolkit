import React from "react";

const Portada = () => {
  if (window.innerWidth < 576)
    return (
      <div className="py-4" style={{ backgroundColor: "#D9D9D9" }}>
        <div className="container">
          <div className="row">
            <div className="col-6 bg-info m-auto my-3 ">
              <div className="d-flex justify-content-center aling-items-center  ">
                <img src="/images/logo.png"></img>
              </div>
            </div>

            <div className="col-12  col-sm-6 d-flex flex-column justify-content-center aling-items-center container ">
              <div className=" ">
                <div className="text-start">
                  <h1 style={{ fontWeight: "bold" }}>Todo lo que necesitas</h1>
                </div>
                <h5>
                  Los mejores articulos electronicos en tu tienda favorita
                </h5>
                <button className="btn btn-dark mt-3">Comprar Ahora</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="py-5" style={{ backgroundColor: "#D9D9D9" }}>
      <div className={window.innerWidth < 768 ? "mx-5 " : "container"}>
        <div className="row">
          <div className="col-12  col-sm-6 d-flex flex-column justify-content-center aling-items-center container ">
            <div className=" ">
              <div className="text-start">
                <h1 style={{ fontWeight: "bold" }}>Todo lo que necesitas</h1>
              </div>
              <h5>Los mejores articulos electronicos en tu tienda favorita</h5>
              <button className="btn btn-dark mt-3">Comprar Ahora</button>
            </div>
          </div>
          <div className="col-6 bg-info m-auto ">
            <div className="d-flex justify-content-center aling-items-center  ">
              <img src="/images/logo.png"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portada;
