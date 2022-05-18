import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
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
  id?: number;
  category: string;
  description: string;
  title: string;
  status?: string;
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

    postReply: (
      state,
      action: PayloadAction<{
        id?: number;
        content: string;
        commentId: number;
        replyingTo: string;
        parentId?: number;
      }>
    ) => {
      // id is the url/id which corresponds to currentPost | commentId is the clicked comment inside the currentPost
      const { id, content, commentId, replyingTo, parentId } = action.payload;
      const currentPost = state.value.find((post: any) => post.id === id);
      const clickedComment = currentPost.comments.find(
        (item: any) => item.id === commentId || item.id === parentId
      );

      const newReply = {
        content: content,
        replyingTo: replyingTo,
        user: data.currentUser,
      };

      if (clickedComment.replies) {
        clickedComment.replies.push(newReply);
      }
      if (!clickedComment.replies) {
        clickedComment.replies = [];
        clickedComment.replies.push(newReply);
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

    editPost: (state, action: PayloadAction<NewFeedback>) => {
      const { id, category, status, title, description } = action.payload;
      const postToEdit = state.value.find(
        (post: { id: number }) => post.id === id
      );
      if (postToEdit) {
        postToEdit.title = title;
        postToEdit.status = status;
        postToEdit.category = category;
        postToEdit.description = description;
      }
    },

    removePost: (state, action: PayloadAction<number>) => {
      const postToRemove = state.value.find(
        (post: { id: number }) => post.id === action.payload
      );
      const index = state.value.indexOf(postToRemove);
      state.value.splice(index, 1);
    },
  },
});

export const {
  addData,
  addComment,
  upvotePost,
  postReply,
  editPost,
  removePost,
} = dataSlice.actions;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default dataSlice.reducer;
