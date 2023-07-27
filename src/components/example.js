import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  isError,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getProducts } from "../../../api/productsApi";
import Loading from "../../Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Message from "../../LoadingError/Error";
import Product from "./ProductGrid";

const GridProductList = ({ searchWord }) => {
  const [keyword, setKeyword] = useState(null);
  const queryClient = useQueryClient(); // Obtenemos el queryClient de React Query

  useEffect(() => {
    if (searchWord) {
      setKeyword(searchWord);
    } else {
      setKeyword(null);
    }
  }, [searchWord]);

  const { data, isLoading, isError, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ["infinity-products"],
      ({ pageParam = 0 }) => {
        const queryParam = keyword ? `&keyword=${keyword}` : "";
        return getProducts(
          `/api/products?pageNumber=${pageParam}${queryParam}`
        );
      },
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.page === lastPage.pages) return false;
          return lastPage.page + 1;
        },
      }
    );

  const productList = data?.pages.flatMap((page) => page.products) ?? [];

  // Definimos una función para manejar la actualización del keyword
  const handleKeywordUpdate = (newKeyword) => {
    setKeyword(newKeyword);
    // Invalidamos la consulta para que se actualice con el nuevo keyword
    queryClient.invalidateQueries("infinity-products");
  };

  if (isLoading) return <Loading />;
  if (isError) return <Message variant="alert-danger">{error.message}</Message>;
  else {
    return (
      <>
        {/* Agregamos un componente para actualizar el keyword */}
        <div>
          <input
            type="text"
            value={keyword || ""}
            onChange={(e) => handleKeywordUpdate(e.target.value)}
            placeholder="Buscar productos..."
          />
        </div>
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
          <div className="grid mx-auto">
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
