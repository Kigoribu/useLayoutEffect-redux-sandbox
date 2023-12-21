import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import nodeReducer from "./nodeSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    nodes: nodeReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
