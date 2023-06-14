import { useEffect } from "react";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { getProudcts } from "../../api/productsApi";
import {
  setProducts,
  setLoading,
  setError,
} from "../../features/products/productsSlice";
import GridProductList from "./GridProductList";
import ReactPaginat from "./ReactPaginat";

const ShopSections = () => {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.products);
  console.log(page);

  const queryClient = new QueryClient(); // Crear una instancia de QueryClient

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
  }, [data, isLoading, isError, dispatch]);

  if (isLoading) return <div> Loading ...</div>;
  else if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-neutral-100">
      <GridProductList />
      <ReactPaginat />
    </div>
  );
};

export default ShopSections;
