import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  // initialState: { name: "", email: "", isAdmin: "", token: "", _id: "" },
  initialState: {},
  reducers: {
    setLogin: (state, action) => {
      const { name, email, number, isAdmin, token, _id, createdAt } =
        action.payload;

      state.name = name;
      state.email = email;
      state.number = number;
      state.isAdmin = isAdmin;
      state.token = token;
      state._id = _id;
      state.createdAt = createdAt;

      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },

    updateLogin: (state, action) => {
      const { name, email, number, _id } = action.payload;

      state.name = name;
      state.email = email;
      state.number = number;
      state._id = _id;

      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setLogin, updateLogin } = userSlice.actions;

export default userSlice.reducer;
