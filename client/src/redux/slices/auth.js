import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios.js";
import { showSnackBar } from "./snackbar.js";


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
      state.token = null;
      state.email = null;
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

// THUNKS
export function LoginUser(formInputs, setUserID) {
  return async (dispatch) => {
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
        setUserID(res.data.user_id);
        dispatch(showSnackBar({ severity: "success", message: res.data.message }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(showSnackBar({ severity: "error", message: err.response.data.message }));
      });
  };
}

// TODO: Remove all conversations from redux store upon logout
export function LogoutUser(removeUserID) {
  return async (dispatch) => {
    try {
      dispatch(slice.actions.logoutUser());
      removeUserID();
      dispatch(showSnackBar({ severity: "success", message: "Successfully Logged Out" }));
    } catch (err) {
      dispatch(showSnackBar({ severity: "error", message: err.response.data.message }));
    }
  };
}

export function ForgotPassword(formInputs) {
  return async (dispatch) => {
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
        dispatch(showSnackBar({ severity: "success", message: res.data.message }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(showSnackBar({ severity: "error", message: err.response.data.message }));
      });
  };
}

export function ResetPassword(formInputs, setUserID) {
  return async (dispatch) => {
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
        setUserID(res.data.user_id);
        dispatch(showSnackBar({ severity: "success", message: res.data.message }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(showSnackBar({ severity: "error", message: err.response.data.message }));
      });
  };
}

export function RegisterUser(formInputs, navigateToVerifyOTPPage) {
  return async (dispatch) => {
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
        dispatch(slice.actions.updateRegisterEmail({ email: formInputs.email }));
        dispatch(slice.actions.updateIsLoading({ isLoading: false, error: false }));
        dispatch(showSnackBar({ severity: "success", message: res.data.message }));
        navigateToVerifyOTPPage();
      })
      .catch((err) => {
        console.log(err);
        dispatch(slice.actions.updateIsLoading({ isLoading: false, error: true }));
        dispatch(showSnackBar({ severity: "error", message: err.response.data.message }));
      });
  };
}

export function VerifyEmail(formInputs, setUserID) {
  console.log(formInputs);
  return async (dispatch) => {
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
        console.log(res);
        dispatch(
          slice.actions.loginUser({
            isLoggedIn: true,
            token: res.data.token,
          })
        );
        dispatch(showSnackBar({ severity: "success", message: res.data.message }));
        setUserID(res.data.user_id);
      })
      .catch((err) => {
        console.log(err);
        dispatch(showSnackBar({ severity: "error", message: err.message }));
      })
      .finally(() => {});
  };
}
