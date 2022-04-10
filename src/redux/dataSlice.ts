import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "./store";
import data from "../data.json";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

interface Data {
  value: any;
}

const initialState: Data = {
  value: data.productRequests,
};

// comments: ({
//   id: number;
//   content: string;
//   user: {
//       image: string;
//       name: string;
//       username: string;
//   };
//   replies?: undefined;

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<any>) => {
      state.value.push(action.payload);
    },
    addComment: (state, action: PayloadAction<any>) => {
      const { id, text } = action.payload;
      const currentPost = state.value.find(
        (post: { id: number }) => post.id === id
      );
      if (currentPost) {
        currentPost.comments.push({
          id: 123123,
          content: text,
          user: data.currentUser,
          replies: [],
        });
      }
    },
  },
});

export const { addData, addComment } = dataSlice.actions;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default dataSlice.reducer;
