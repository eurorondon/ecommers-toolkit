import axios from "axios";

const productsApi = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const loginUser = async (email, password) => {
  try {
    const res = await productsApi.post("/api/users/login", { email, password });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerUser = async (name, number, email, password) => {
  try {
    const res = await productsApi.post("/api/users", {
      name,
      number,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (name, number, email, password) => {
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

      const res = await productsApi.put(
        "/api/users/profile",
        {
          name,
          number,
          email,
          password,
        },
        config
      );

      return res.data;
    }
  } catch (error) {
    // Manejo de errores (si es necesario)
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};
