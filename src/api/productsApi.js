import axios from "axios";

const productsApi = axios.create({
  baseURL: "https://apirest.larahogarplastic.com",
});

export const getProudcts = async (page) => {
  const res = await productsApi.get(`api/products?pageNumber=${page}`);
  return res.data;
};

export const getProudct = async (id) => {
  const res = await productsApi.get(`api/products/${id}`);
  return res.data;
};
