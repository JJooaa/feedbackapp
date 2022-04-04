import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import counterReducer from "./counterSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
