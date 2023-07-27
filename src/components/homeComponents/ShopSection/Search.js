import React, { useEffect, useState } from "react";
import Product from "./ProductGrid";
import { Link, useParams } from "react-router-dom";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../../../api/productsApi";
import Loading from "../../Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Message from "../../LoadingError/Error";

const Search = () => {
  const { searchWord } = useParams();
  const [keyword, setKeyword] = useState();

  const queryClient = useQueryClient();

  useEffect(() => {
    setKeyword(searchWord);
  }, [searchWord]);

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(
    ["infinity-products", keyword], // Include keyword in the query key
    ({ pageParam = 0 }) =>
      getProducts(`/api/products?pageNumber=${pageParam}&keyword=${keyword}`),

    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page === lastPage.pages) return false;
        return lastPage.page + 1;
      },
    }
  );

  console.log(data);

  const productList = data?.pages.flatMap((page) => page.products) ?? [];

  useEffect(() => {
    // Whenever keyword changes, invalidate the query to trigger refetch
    queryClient.invalidateQueries(["infinity-products", keyword]);
  }, [keyword, queryClient]);

  if (isLoading) return <Loading />;
  if (isError) return <Message variant="alert-danger">{error.message}</Message>;
  else {
    return (
      <>
        <h2>Todos los Articulos</h2>
        <InfiniteScroll
          dataLength={productList.length}
          hasMore={hasNextPage} // Usar hasNextPage en lugar de isLoading
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

export default Search;
