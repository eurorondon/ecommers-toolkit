import { createSlice } from "@reduxjs/toolkit";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const userSlice = createSlice({
  name: "user",
  // initialState: { name: "", email: "", isAdmin: "", token: "", _id: "" },
  initialState: {},
  reducers: {
    setLogin: (state, action) => {
      const { name, email, isAdmin, token, _id } = action.payload;
      state.name = name;
      state.email = email;
      state.isAdmin = isAdmin;
      state.token = token;
      state._id = _id;

      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setLogin } = userSlice.actions;

export default userSlice.reducer;
