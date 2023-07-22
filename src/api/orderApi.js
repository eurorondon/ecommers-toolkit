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
    Authorization: `Bearer ${userInfo.token}`,
  },
};

export const createOrder = async (order) => {
  // console.log(order);
  try {
    const res = await productsApi.post("/api/orders", order, config);
    // console.log(res);
    return res.data;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};
