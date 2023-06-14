import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { getProudcts } from "../../../api/productsApi";
import {
  setProducts,
  setLoading,
  setError,
} from "../../../features/products/productsSlice";
import GridProductList from "./GridProductList";
import InfiniteScroll from "react-infinite-scroll-component";
import { setPage } from "../../../features/products/productsSlice";
import Loading from "../../Loading";

const ShopSections = () => {
  const [currentPage, setCurrentPage] = useState(0);
  console.log(currentPage);
  const dispatch = useDispatch();
  const { page, pages, productList } = useSelector((state) => state.products);

  // Ejecutamos la llamada a la API, react-query nos ayuda con el estado de la petición
  const { isLoading, data, isError, error } = useQuery(
    ["products", page], // Incluir el parámetro 'page' en el array de dependencias de la queryKey
    () => getProudcts(page) // Pasar una función anónima que invoque getProudcts con el parámetro page
    // {
    //   client: queryClient, // Pasar la instancia de QueryClient como opción 'client'
    // }
  );

  // enviamos los datos extraídos de la API a REDUX
  useEffect(() => {
    if (data) {
      dispatch(setProducts(data));
    }
    if (isError) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(isLoading));
  }, [data, isLoading, isError, error, dispatch]);

  useEffect(() => {
    dispatch(setPage(currentPage));
  }, [dispatch, currentPage]);

  if (!productList.length > 0) return <Loading />;

  return (
    <div className="">
      <InfiniteScroll
        dataLength={productList.length}
        hasMore={page < pages}
        next={() => setCurrentPage((page) => page + 1)}
        loader={
          <div className="mx-auto">
            <Loading />
          </div>
        }
      >
        <GridProductList />
      </InfiniteScroll>
    </div>
  );
};

export default ShopSections;
