import { useSelector } from "react-redux";
import Product from "./ProductGrid";

const GridProductList = () => {
  const { productList } = useSelector((state) => state.products);

  console.log(productList);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "10px",
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
