// FOR DM ROOMS
import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios.js";
import { showSnackBar } from "./snackbar.js";
import { faker } from "@faker-js/faker";

const initialState = {
  currentConversation: null, // room_id of the selected conversation
  messages: [],
  allConversations: [], // all rooms
};

const slice = createSlice({
  name: "direct_conversation",
  initialState,
  reducers: {
    fetchAllConversationsList(state, action) {
      // action will contain complete list of conversations in the format as in the data
      // action.payload.conversation should contain
      /*
        {
          [
            {
              "room id",
              participants: [{"id1, "firstName", "lastName", "status", "last_message_from_user", "unread_count", "last_seen", "blocked" ... and all things asked}, ...{}]

            }
          ]
        }
      */
      const completeList = action.payload.conversations.map((ele) => {
        const otherUser = ele.participants.find((ele) => ele._id.toString() !== action.payload.user_id);
        return {
          id: ele._id,
          user_id: otherUser._id,
          name: `${otherUser.firstName} ${otherUser.lastName}`,
          online: otherUser.status === "online",
          img: faker.image.avatar(),
          msg: faker.random.words(),

          time: "9:36",
          pinned: otherUser.pinned,
          archived: otherUser.archived,
          muted: otherUser.muted,
          blocked: otherUser.blocked,
        };
      });
      state.allConversations = completeList;
    },

    setCurrentConversation(state, action) {
      state.currentConversation = action.payload.currentConversation;
    },

    // Clear and unset reducers
    unsetCurrentConversation(state, action) {
      state.currentConversation = null;
    },
    clearAllConversation(state, action) {
      state.allConversations = [];
    },
    clearAllMessages(state, action) {
      state.messages = [];
    },
    clearUponLogout(state, action) {
      state.currentConversation = null;
      state.allConversations = [];
      state.messages = [];
    },
  },
});

export default slice.reducer;

/* ------------------------------------ THUNK FUNCTIONS ------------------------------------ */

/* Fetch All DM Rooms */
// in data we need the user_id of the current user as well, apart from all the other stuff.
export function FetchAllConversationsList() {
  return async (dispatch, getState) => {
    await axios
      .get("/app/get-all-conversations", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((res) => {
        dispatch(slice.actions.fetchAllConversationsList({ ...res.data.data }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(showSnackBar({ severity: "error", message: err.response.data.message }));
      });
  };
}

/* Set the current conversation */
export function SetCurrentConversation(roomID) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.setCurrentConversation({ currentConversation: roomID }));
  };
}

// TODO: only thunk will suffice, no need for a separate reducer, no?
/* Unset the current conversation */
export function UnsetCurrentConversation() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.unsetCurrentConversation({}));
  };
}
