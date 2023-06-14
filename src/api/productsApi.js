import axios from "axios";

const productsApi = axios.create({
  baseURL: "https://apirest.larahogarplastic.com",
});

export const getProudcts = async (page) => {
  const res = await productsApi.get(`api/products?pageNumber=${page}`);
  console.log(page);
  return res.data;
};
