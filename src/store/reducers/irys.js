import { createSlice } from "@reduxjs/toolkit";

export const irys = createSlice({
  name: "irys",
  initialState: {
    node: null,
    irys: null,
    token: null,
    balance: 0,
  },
  reducers: {
    setNode: (state, action) => {
      state.node = action.payload;
    },
    setIrys: (state, action) => {
      state.irys = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const { setNode, setIrys, setToken, setBalance } = irys.actions;

export default irys.reducer;
