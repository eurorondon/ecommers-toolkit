import axios from "axios";

const productsApi = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const createOrder = async (order) => {
  const userInfoFromLocalStorage = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoFromLocalStorage ?? "null");

  if (userInfo?.token) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const res = await productsApi.post("/api/orders", order, config);

      return res.data;
    } catch (error) {
      throw error;
    }
  }
};

export const orderDetails = async (id) => {
  const userInfoFromLocalStorage = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoFromLocalStorage ?? "null");

  try {
    if (userInfo?.token) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const res = await productsApi.get(`/api/orders/${id}`, config);
      return res.data;
    } else {
    }
  } catch (error) {
    throw error;
  }
};

export const payOrder = async (orderId, order, email, image) => {
  const userInfoFromLocalStorage = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoFromLocalStorage ?? "null");

  const userName = order.user.name;
  const { totalPrice, _id } = order;

  try {
    if (userInfo?.token) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const res = await productsApi.put(
        `/api/orders/${orderId}/pay`,
        {},
        config
      );

      const form = new FormData();
      form.append("image", image);

      const result = await productsApi.put(
        `/api/orders/${orderId}/upload`,
        form
        // config
      );

      return { result }; // Devuelve un objeto con ambas respuestas
    }
  } catch (error) {
    throw error;
  }
};
