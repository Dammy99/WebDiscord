import { configureStore } from "@reduxjs/toolkit";
import peerReducer from "../Slices/peerSlice";
import userIdReducer from "../Slices/userIdSlice";

const store = configureStore({
  reducer: {
    peers: peerReducer,
    userId: userIdReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
