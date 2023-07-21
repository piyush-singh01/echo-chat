// The root reducer, will take all the slices and combine all of them

import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage"; //local storage?
import appReducer from "./slices/app.js";
import authReducer from "./slices/auth.js";
import conversationReducer from "./slices/conversation.js";
//slices

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redix-",

  // if we dont want to persist everything, we can have,
  // whitelist: [],
  // blacklist: []
};

const rootReducer = combineReducers({
  app: appReducer, // appReducer for app
  auth: authReducer,
  conversation: conversationReducer,
});

export { rootPersistConfig, rootReducer };
