import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "./store";
import data from "../data.json";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

interface Data {
  value: any;
  user: {
    image: string;
    name: string;
    username: string;
    upvotes: Array<number>;
  };
}

const initialState: Data = {
  value: data.productRequests,
  user: data.currentUser,
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

    addComment: (
      state,
      action: PayloadAction<{ id: number; text?: string }>
    ) => {
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

    upvotePost: (state, action: PayloadAction<number>) => {
      const clickedPost = state.value.find(
        (post: { id: number }) => post.id === action.payload
      );
      let hasPersonUpvoted = state.user.upvotes.includes(action.payload);
      console.log(hasPersonUpvoted);
      if (clickedPost && !hasPersonUpvoted) {
        console.log("plus");
        clickedPost.upvotes += 1;
        state.user.upvotes.push(action.payload);
      }
      if (hasPersonUpvoted && clickedPost) {
        console.log("minus");
        clickedPost.upvotes -= 1;
        // state.user.upvotes
      }
    },
  },
});

export const { addData, addComment, upvotePost } = dataSlice.actions;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default dataSlice.reducer;
