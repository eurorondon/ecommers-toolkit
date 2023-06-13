import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { getProudcts } from "../../api/productsApi";
import {
  setProducts,
  setLoading,
  setError,
} from "../../features/products/productsSlice";
import GridProductList from "./GridProductList";

const ShopSections = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products);

  // Ejecutamos la llamada a la api , reactquery nos ayuda con el estado de la peticion
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProudcts,
  });

  // enviamos los datos extraidos de la api a REDUX
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
  else if (isError) return <div>Error:{error.message}</div>;

  return (
    <div>
      <GridProductList />
    </div>
  );
};

export default ShopSections;
