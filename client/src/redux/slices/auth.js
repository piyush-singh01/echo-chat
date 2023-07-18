import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios.js";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;   // TODO: are we storing jwt tokens in redux store?
    },
    signout(state, action) {
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});

export default slice.reducer;

// THUNKS -> we use thunks to perform complex logic, as reducers are supposed to be pure functions.
export function LoginUser(formInputs) {
  // formInputs = {email, password};
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/login",
        {
          ...formInputs,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(
          slice.actions.login({
            isLoggedIn: true,
            token: res.data.token,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
