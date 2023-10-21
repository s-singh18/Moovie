import { createSlice } from "@reduxjs/toolkit";

export const moovieTierNFT = createSlice({
  name: "moovieTierNFT",
  initialState: {
    contract: null,
  },
  reducers: {
    setMoovieTierNFTContract: (state, action) => {
      state.contract = action.payload;
    },
  },
});

export const { setMoovieTierNFTContract } = moovieTierNFT.actions;

export default moovieTierNFT.reducer;
