import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT", //The sidebar will open contact info by default, so setting it as initial state
    },
    snackbar: {
      open: false,
      message: null,
      severity: null,
    },
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Toggle Sidebar.
    toggleSidebar(state, action) {
      state.sidebar.open = !state.sidebar.open;
    },

    updateSidebar(state, action) {
      state.sidebar.type = action.payload.type;
    },
    openSnackBar(state, action) {
      state.snackbar.open = true;
      state.snackbar.message = action.payload.message;
      state.snackbar.severity = action.payload.severity;
    },
    closeSnackBar(state, action) {
      state.snackbar.open = false;
      state.snackbar.message = null;
      state.snackbar.severity = null;
    },
  },
});

export default slice.reducer; //Only export the reducer from slice.

// THUNK FUNCTIONS
export function ToggleSidebar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSidebar());
  };
}

export function UpdateSidebar(type) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateSidebar({ type }));
  };
}

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
