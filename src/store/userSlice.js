import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  type: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userName = action.payload.userName;
      state.type = action.payload.type;
    },
    logout: (state) => {
      state.userName = "";
      state.type = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
