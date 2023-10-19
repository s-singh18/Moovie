import { createSlice } from "@reduxjs/toolkit";

export const provider = createSlice({
  name: "provider",
  initialState: {
    provider: null,
    chainId: 80001, // Default to matic mumbai
    account: null,
  },
  reducers: {
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
    setNetwork: (state, action) => {
      state.chainId = action.payload;
    },
    setAccount: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { setAccount, setNetwork, setProvider } = provider.actions;

export default provider.reducer;
