import axios from "axios";

const productsApi = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

const userInfoFromLocalStorage = localStorage.getItem("userInfo");
// console.log(userInfoFromLocalStorage);

let userInfo = null;

try {
  // Parsear el valor si es una cadena JSON y obtener un objeto JavaScript
  userInfo = JSON.parse(userInfoFromLocalStorage);
} catch (error) {
  // Si hay algún error al parsear, puedes manejarlo aquí o simplemente dejar userInfo como null
}

// console.log(userInfo);

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userInfo?.token}`,
  },
};

export const createOrder = async (order) => {
  // console.log(order);
  try {
    const res = await productsApi.post("/api/orders", order, config);
    console.log(res);
    return res.data;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export const orderDetails = async (id) => {
  // console.log(order);
  try {
    const res = await productsApi.get(`/api/orders/${id}`, config);
    // console.log(res);
    return res.data;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export const payOrder = async (orderId, order, email, image) => {
  const userName = order.user.name;
  const { totalPrice, _id } = order;
  console.log(image);

  const res = await productsApi.put(`/api/orders/${orderId}/pay`, {}, config);

  const form = new FormData();
  form.append("image", image);

  const result = await productsApi.put(
    `/api/orders/${orderId}/upload`,
    form
    // config
  );

  return result, res;

  // console.log(result);

  // console.log(form);

  // console.log(order.user.name, order.user.email, console.log(image));
};
