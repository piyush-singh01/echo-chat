import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { showSnackBar } from "./snackbar";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT", //The sidebar will open contact info by default, so setting it as initial state
  },
  // snackbar: {
  //   open: false,
  //   message: null,
  //   severity: null,
  // },
  users: [], // users who are not friends and are not requested
  all_users: [], // complete list of users
  friends: [], // friends
  friendRequests: [], // friend requests
  chat_type: null, // the chat type: group or dm
  room_id: null, // each convo will have a room id
};

// REDUX SLICE
const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Sidebar
    toggleSidebar(state, action) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebar(state, action) {
      state.sidebar.type = action.payload.type;
    },

    // Snack Bar
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

    // Users and Friends
    updateAllUsers(state, action) {
      state.all_users = action.payload.all_users;
    },
    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    updateFriendRequests(state, action) {
      state.friendRequests = action.payload.friendRequests;
    },

    // Conversations
    selectConversation(state, action) {
      state.chat_type = "individual";
      state.room_id = action.payload.room_id;
    },
  },
});

// Reducers
export default slice.reducer;

// THUNK FUNCTIONS ------------------------------------
// Sidebar
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

// Snackbar
// export function showSnackBar({ severity, message }) {
//   return async (dispatch, getState) => {
//     dispatch(slice.actions.openSnackBar({ message, severity }));

//     setTimeout(() => {
//       dispatch(slice.actions.closeSnackBar());
//     }, 3000);
//   };
// }

// export function collapseSnackBar() {
//   return async (dispatch, getState) => {
//     dispatch(slice.actions.closeSnackBar());
//   };
// }

// Fetch Lists
export function FetchUsers() {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(slice.actions.updateUsers({ users: res.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function FetchFriends() {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-friends", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(slice.actions.updateFriends({ friends: res.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function FetchFriendRequests() {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-friend-requests", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(slice.actions.updateFriendRequests({ friendRequests: res.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function SelectConversation({ room_id }) {
  return (dispatch, getState) => {
    dispatch(slice.actions.selectConversation({ room_id }));
  };
}

// Update Profile
export function UpdateProfile(formInputs) {
  return async (dispatch, getState) => {
    await axios
      .patch(
        "/user/update-me",
        {
          ...formInputs,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((res) => {
        dispatch(showSnackBar({ severity: "success", message: res.data.message }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(showSnackBar({ severity: "error", message: err.message }));
      });
  };
}
