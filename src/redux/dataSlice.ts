import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "./store";
import data from "../data.json";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

interface Data {
  value: any;
}

const initialState: Data = {
  value: [...data.productRequests],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<any>) => {
      state += action.payload;
    },
  },
});

export const { addData } = dataSlice.actions;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default dataSlice.reducer;
