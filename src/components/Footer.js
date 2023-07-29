import React from "react";

const Footer = () => {
  return (
    <div className="">
      <footer
        className="text-center text-lg-start bg-light  bg-dark text-light "
        id="Footer"
      >
        {/* <!-- Section: Social media --> */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          {/* <!-- Left --> */}

          {/* <!-- Left --> */}

          {/* <!-- Right --> */}

          {/* <!-- Right --> */}
        </section>
        {/* <!-- Section: Social media --> */}

        {/* <!-- Section: Links  --> */}
        <section className="">
          <div className="container text-center text-md-start ">
            {/* <!-- Grid row --> */}
            <div className="row mt-3">
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4 text-center">
                  Contacto
                </h6>
                <div
                  className={`d-flex justify-content-evenly text-center ${
                    window.innerWidth < 1194 ? "flex-column" : ""
                  }`}
                >
                  <p>
                    <i className="fas fa-home me-3"></i> Barquisimeto, Edo Lara
                    3001
                  </p>
                  <p>
                    <i className="fas fa-envelope me-3"></i> Patuquee@gmail.com
                  </p>
                  <p>
                    <i className="fas fa-phone me-3"></i> +58 0412-2647326
                  </p>
                </div>
                {/* <p>
                  <i class="fas fa-print me-3"></i> +58 412 6022 881
                </p> */}
              </div>
              {/* <!-- Grid column --> */}
            </div>
            {/* <!-- Grid row --> */}
          </div>
        </section>
        {/* <!-- Section: Links  --> */}

        {/* <!-- Copyright --> */}
        <div
          className="text-center p-4"
          // style="background-color: rgba(0, 0, 0, 0.05);"
        >
          © 2023 Copyright:
          <a className="text-reset fw-bold" href="#">
            Patuquee.com
          </a>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
    </div>
  );
};

export default Footer;
