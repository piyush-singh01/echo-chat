import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios.js";
import { showSnackBar } from "./app.js";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  email: "",
  error: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn; // TODO: make it true hardcode, not from the action
      state.token = action.payload.token; // TODO: are we storing jwt tokens in redux store?
    },
    logoutUser(state, action) {
      state.isLoggedIn = false;
      state.token = "";
    },
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    },
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
        dispatch(
          showSnackBar({ severity: "success", message: res.data.message })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(showSnackBar({ severity: "error", message: err.message }));
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

export function RegisterUser(formInputs) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post(
        "/auth/register",
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
          slice.actions.updateRegisterEmail({ email: formInputs.email })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      })
      .finally(() => {
        //? can also use the useNavigate hook by passing it as a call back function and then calling it here. The definition of the callback function is passed and defined inside the react component from where this THUNK is called. But for now do this.
        if (!getState().auth.error) {
          window.location.href = "/auth/verify"; // can not use the useNavigate hook here as it is not a react component, but a
        }
      });
  };
}

export function VerifyEmail(formInputs) {
  console.log(formInputs);
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/verify-otp",
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
        console.log("here");
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
      })
      .finally(() => {});
  };
}
