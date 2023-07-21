import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
import axios from "../../utils/axios.js";

const initialState = {
  direct_chat: {
    conversations: [], // a list of conversations to render on chat
    current_conversation: null, //   the selected conversation
    current_messages: [], //messages in current conversation
  },
  group_chat: {},
};

const user_id = window.localStorage.getItem("user_id");

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchDirectConversations(state, actions) {
      const list = actions.payload.conversations.map((el) => {
        const other_user = el.participants.find(
          (ele) => ele._id.toString() !== user_id
        );
        return {
          // data in same format to that in chat list
          id: el._id, // this will also server as the room_id
          user_id: other_user._id, // the id of user which we are chatting
          name: `${other_user.firstName} ${other_user.lastName}`,
          img: faker.image.avatar(),
          msg: faker.music.songName(),
          time: "9:36",
          unread: 0,
          pinned: true,
          online: true,
        };
      });
      state.direct_chat.conversations = list;
    },
  },
});

export default slice.reducer;

export const FetchDirectConversations = ({ conversations }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchDirectConversations({ conversations }));
  };
};
