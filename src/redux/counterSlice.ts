import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  value: number;
}

const initialState: State = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;
