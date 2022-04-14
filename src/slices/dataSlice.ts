import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../app/store";
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

interface NewFeedback {
  category: string;
  description: string;
  title: string;
}

const initialState: Data = {
  value: data.productRequests,
  user: data.currentUser,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<NewFeedback>) => {
      state.value.push({
        ...action.payload,
        id: state.value.length + 1,
        upvotes: 0,
        comments: [],
        status: "suggestion",
      });
    },

    addComment: (
      state,
      action: PayloadAction<{ id: number; text: string | undefined }>
    ) => {
      const { id, text } = action.payload;
      const currentPost = state.value.find(
        (post: { id: number }) => post.id === id
      );
      const newComment = {
        id: 123123,
        content: text,
        user: data.currentUser,
        replies: [],
      };
      if (currentPost.comments) {
        currentPost.comments.push(newComment);
      }
      // if there are no comments, the array doesnt exist, so make a new array
      if (!currentPost.comments) {
        currentPost.comments = [];
        currentPost.comments.push(newComment);
      }
    },

    upvotePost: (state, action: PayloadAction<number>) => {
      const clickedPost = state.value.find(
        (post: { id: number }) => post.id === action.payload
      );
      let hasPersonUpvoted = state.user.upvotes.includes(action.payload);
      // upvote
      if (clickedPost && !hasPersonUpvoted) {
        clickedPost.upvotes += 1;
        // using a user.upvotes array to see what we have already upvoted
        state.user.upvotes.push(action.payload);
      }
      // remove upvote
      if (clickedPost && hasPersonUpvoted) {
        clickedPost.upvotes -= 1;
        // find the index of the suggestion id and save it
        const removeIndex = state.user.upvotes.indexOf(action.payload);
        // remove the index ie suggestion
        state.user.upvotes.splice(removeIndex, 1);
      }
    },
  },
});

export const { addData, addComment, upvotePost } = dataSlice.actions;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default dataSlice.reducer;
