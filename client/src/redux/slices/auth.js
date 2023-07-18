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
    loginUser(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token; // TODO: are we storing jwt tokens in redux store?
    },
    logoutUser(state, action) {
      state.isLoggedIn = false;
      state.token = "";
    },
    resetPassword(state, action) {},
  },
});

export default slice.reducer;

// THUNKS -> we use thunks to perform complex logic, as reducers are supposed to be pure functions.
// dispatch(fn(action_object)) --> that's why we can call dispatch on functions, which take in data.
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
          slice.actions.loginUser({
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

// TODO: Look more on the logout logic, sure only this much needs to be done?

export function LogoutUser(formInputs) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.logoutUser());
  };
}

export function ForgotPassword(formInputs) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/forgot-password",
        {
          ...formInputs,
        },
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function ResetPassword(formInputs) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/reset-password",
        {
          ...formInputs,
        },
        {
          header: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(
          slice.actions.loginUser({
            isLoggedIn: true,
            token: res.data.token,
          })
        );
      })
      .catch((err) => console.log(err));
  };
}
