import { configureStore } from "@reduxjs/toolkit";

import provider from "./reducers/provider";
import irys from "./reducers/irys";
// import tokens from "./reducers/tokens";
// import amm from "./reducers/amm";

export const store = configureStore({
  reducer: {
    provider,
    irys,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
