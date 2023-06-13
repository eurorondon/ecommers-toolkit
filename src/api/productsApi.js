import axios from "axios";

const productsApi = axios.create({
  baseURL: "https://apirest.larahogarplastic.com",
});

export const getProudcts = async () => {
  const res = await productsApi.get("api/products");
  return res.data;
};
