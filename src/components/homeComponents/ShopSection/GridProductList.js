import { useSelector } from "react-redux";
import Product from "./ProductGrid";
import { Link } from "react-router-dom";

const GridProductList = () => {
  const { productList } = useSelector((state) => state.products);

  return (
    <div className=" grid mx-auto ">
      {productList?.map((product) => (
        <div key={product._id}>
          <Link to={`/products/${product._id}`}>
            <Product
              url={product.photo[0].url}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default GridProductList;
