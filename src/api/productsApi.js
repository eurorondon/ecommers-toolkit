import axios from "axios";

const productsApi = axios.create({
  baseURL: "https://apirest.larahogarplastic.com",
});

export const getProducts = async (path) => {
  console.log(path);
  const res = await productsApi.get(path);
  return res.data;
};

export const getProudct = async (id) => {
  const res = await productsApi.get(`api/products/${id}`);
  return res.data;
};
