import { combineReducers, configureStore } from "@reduxjs/toolkit";
import VideosReducer from "../reducers/VideosReducer";

const rootReducer = combineReducers({
  VideosReducer: VideosReducer,
});

export const store = configureStore({ reducer: rootReducer });
