import Product from "../homeComponents/ShopSection/ProductGrid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const customArrow = ({ type, onClick }) => (
  <div
    onClick={onClick}
    style={{
      fontSize: "20px",
      width: "35px",
      height: "30px",
      lineHeight: "30px",
      textAlign: "center",
      backgroundColor: "#6768A9",
      color: "#fff",
      cursor: "pointer",
      margin: "auto",
    }}
  >
    {type === "PREV" ? "r" : "g"}
  </div>
);

const NewProducts = () => {
  const { productList } = useSelector((state) => state.products);
  console.log(productList);

  const products = productList
    ? productList.slice(0, window.innerWidth > 767 ? 30 : 12).map((item) => (
        <Link key={item._id} to={`/products/${item._id}`}>
          <Product
            url={item.photo[0].url}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        </Link>
      ))
    : null;

  return (
    <div className="mt-4" id="Novedades">
      {products && products.length > 1 ? (
        <div className="container mx-auto">
          <h2 className="topsell-title text-center my-4">LO MAS NUEVO</h2>
          <Carousel
            responsive={responsive}
            renderArrow={customArrow}
            itemClass="carousel-item-padding-40-px"
          >
            {products}
          </Carousel>
        </div>
      ) : (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "400px" }}
        >
          {/* Aquí puedes agregar un componente de carga */}
        </div>
      )}
    </div>
  );
};

export default NewProducts;
