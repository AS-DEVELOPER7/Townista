import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { townista } from "./services";

export const store = configureStore({
  reducer: {
    [townista.reducerPath]: townista.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(townista.middleware),
});
setupListeners(store.dispatch);
