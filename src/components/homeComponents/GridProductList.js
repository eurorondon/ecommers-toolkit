import { useSelector } from "react-redux";
import Product from "./ProductGrid";

const GridProductList = () => {
  const { productList } = useSelector((state) => state.products);

  console.log(productList);

  return (
    <div
      className=" mx-5 xl:mx-48 lg:mx-20 md:mx-20 py-20 grid grid-cols-2  sm:grid-cols-4 lg:grid-cols-5  gap-5"
      style={{
        display: "",
        gridTemplateColumns: "",
        gap: "",
      }}
    >
      {productList.map((product) => (
        <div>
          <Product
            url={product.photo[0].url}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        </div>
      ))}
    </div>
  );
};

export default GridProductList;
