import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { showSnackBar } from "./snackbar";

const initialState = {
  user: {},             // current user info
  sidebar: {
    open: false,
    type: "CONTACT",    //The sidebar will open contact info by default, so setting it as initial state
  },
  users: [],            // users who are not friends and are not requested
  friends: [],          // friends
  friendRequests: [],   // friend requests
  allUsers: [],         // complete list of users

  // to delete (below), moved to conversations slice
  // chat_type: null, // the chat type: group or dm
  // room_id: null, // each convo will have a room id
};

// REDUX SLICE
const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Profile
    updateProfile(state, action) {
      state.user = action.payload.user;
    },

    // Sidebar
    toggleSidebar(state, action) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebar(state, action) {
      state.sidebar.type = action.payload.type;
    },


    // Users and Friends
    updateAllUsers(state, action) {
      state.allUsers = action.payload.allUsers;
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

    // TODO: to move conversations to another slice.
    // Conversations
    // selectConversation(state, action) {
    //   state.chat_type = "individual";
    //   state.room_id = action.payload.room_id;
    // },
  },
});

// Reducers
export default slice.reducer;

/* ------------------------------------ THUNK FUNCTIONS ------------------------------------ */

/* USER PROFILE THUNKS */

// Fetch Profile Info
export function GetMyProfile() {
  return async (dispatch, getState) => {
    await axios
      .get("/user/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(slice.actions.updateProfile({ user: res.data.data }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(showSnackBar({ severity: "error", message: err.response.data.message }));
      });
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
        dispatch(showSnackBar({ severity: "error", message: err.response.data.message }));
      });
  };
}

/* SIDEBAR THUNKS */
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


/* FRIENDS AND USERS THUNKS */
// Fetch All Not Friends and Not Requested users
export function FetchAllNonFriends() {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-all-non-friends", {
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

// export function SelectConversation({ room_id }) {
//   return (dispatch, getState) => {
//     dispatch(slice.actions.selectConversation({ room_id }));
//   };
// }
