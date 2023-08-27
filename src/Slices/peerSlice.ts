import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../config/store";
import Peer from "peerjs";

interface PeerState {
  value: Peer;
}

const initialState: PeerState = {
  value: new Peer(),
};

export const peerSlice = createSlice({
  name: "peer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPeer: (state, action: PayloadAction<Peer>) => {
      // Redux Toolkit автоматично присвоює значення action.payload полю value стану
      state.value = action.payload;
    },
  },
});

export const { setPeer } = peerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPeer = (state: RootState) => state.peers.value;

export default peerSlice.reducer;
