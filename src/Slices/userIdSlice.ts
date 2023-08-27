import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../config/store";

interface UserIdState {
  value: string;
}

const initialState: UserIdState = {
  value: "",
};

export const userIdSlice = createSlice({
  name: "userId",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      // Redux Toolkit автоматично присвоює значення action.payload полю value стану
      state.value = action.payload;
    },
  },
});

export const { setUserId } = userIdSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserId = (state: RootState) => state.userId.value;

export default userIdSlice.reducer;
