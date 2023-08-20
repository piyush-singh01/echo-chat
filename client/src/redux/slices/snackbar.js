import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios.js";

const initialState = {
  open: false,
  message: null,
  severity: null,
};

// REDUX SLICE
const slice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackBar(state, action) {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    closeSnackBar(state, action) {
      state.open = false;
      state.message = null;
      state.severity = null;
    },
  },
});

export default slice.reducer;

// THUNKS
export function showSnackBar({ severity, message }) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.openSnackBar({ message, severity }));

    setTimeout(() => {
      dispatch(slice.actions.closeSnackBar());
    }, 3000);
  };
}

export function collapseSnackBar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.closeSnackBar());
  };
}
