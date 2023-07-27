import Product from "./ProductGrid";
import { Link, useParams } from "react-router-dom";
import { isError, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../api/productsApi";
import Loading from "../../Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Message from "../../LoadingError/Error";

const GridProductList = () => {
  const { searchWord } = useParams();
  console.log(searchWord);

  const { data, isLoading, isError, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ["infinity-products", searchWord],
      ({ pageParam = 1 }) => {
        const searchtest = searchWord
          ? `/api/products?pageNumber=${pageParam}&keyword=${searchWord}`
          : `/api/products?pageNumber=${pageParam}`;
        return getProducts(searchtest);
      },
      {
        getNextPageParam: (lastPage) => {
          console.log("lastPage.page = ", lastPage.page);
          console.log("lastPage.pages = ", lastPage.pages);

          if (lastPage.page === lastPage.pages) return false;
          return lastPage.page + 1;
        },
      }
    );

  console.log(data);
  // const productList =
  //   data?.pages.reduce(
  //     (prevProducts, page) => prevProducts.concat(page.products),
  //     []
  //   ) ?? [];

  const productList = data?.pages.flatMap((page) => page.products) ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <Message variant="alert-danger">{error.message}</Message>;
  else {
    return (
      <>
        <h2>Todos los Articulos</h2>
        <InfiniteScroll
          dataLength={productList.length}
          hasMore={hasNextPage}
          next={() => fetchNextPage()}
          loader={
            <div className="mx-auto">
              <Loading />
            </div>
          }
        >
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
        </InfiniteScroll>
      </>
    );
  }
};

export default GridProductList;
