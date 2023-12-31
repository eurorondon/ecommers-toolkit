import Product from "./ProductGrid";
import { Link, useParams } from "react-router-dom";
import { isError, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../api/productsApi";
import Loading from "../../Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Message from "../../LoadingError/Error";
import { useEffect } from "react";
import { Search } from "@mui/icons-material";

const GridProductList = () => {
  const { searchWord, category } = useParams();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Verificar si category es null o undefined y asignar un valor vacío en caso afirmativo
  const modifiedParam = category ? capitalizeFirstLetter(category) : "";

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(
    ["infinity-products", searchWord],
    ({ pageParam = 1 }) => {
      const searchtest = searchWord
        ? `/api/products?pageNumber=${pageParam}&keyword=${searchWord}`
        : category
        ? `/api/products?pageNumber=${pageParam}&category=${modifiedParam}`
        : `/api/products?pageNumber=${pageParam}`;
      return getProducts(searchtest);
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page === lastPage.pages) return false;
        return lastPage.page + 1;
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [category, searchWord]);

  const productList = data?.pages.flatMap((page) => page.products) ?? [];

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Message variant="alert-danger">{error.message}</Message>
      ) : productList.length < 1 ? (
        <>
          <div className="d-flex flex-column align-items-center my-2">
            <h2>
              <Search style={{ fontSize: "2rem" }} />
              Sin Resultados para:
            </h2>
            <h3>
              <em>{searchWord}</em>
            </h3>
          </div>
          <div>
            <img
              style={{
                width: "100%",
                height: "300px",
                objectFit: "contain",
              }}
              src="/images/not-found.png"
              alt="Not-found"
            />
          </div>
          <div className="mx-2">
            <p className="my-3 text-center" style={{ fontSize: "1.3rem" }}>
              Puedes intentar con otro Nombre o buscar en otra categoria
            </p>
          </div>
        </>
      ) : (
        <div>
          <h3 className="my-3">
            {searchWord
              ? `Busqueda: ${searchWord}`
              : category
              ? `Categoria: ${category}`
              : "Todos los articulos"}
          </h3>
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
        </div>
      )}
    </>
  );
};

export default GridProductList;
