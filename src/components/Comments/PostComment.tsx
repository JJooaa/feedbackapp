import React, { useRef, useState } from "react";
import { useAppDispatch } from "../../slices/dataSlice";
import Button from "../Button/Button";
import { addComment } from "../../slices/dataSlice";
import { useParams } from "react-router-dom";

const PostComment: React.FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [state, setState] = useState<number>(0);

  function postComment() {
    dispatch(addComment({ id: Number(id), text: textAreaRef.current?.value }));
    if (textAreaRef.current?.value) {
      textAreaRef.current.value = "";
      setState(0);
    }
  }

  function handleValueChange() {
    if (textAreaRef.current?.value.length !== undefined) {
      setState(textAreaRef.current.value.length);
    }
  }

  return (
    <div className="leave-comment-container">
      <h2>Add Comment</h2>
      <textarea
        name=""
        id=""
        placeholder="Type your comment here"
        maxLength={250}
        ref={textAreaRef}
        onChange={handleValueChange}
      />
      <div>
        <p>{250 - state} characters left</p>
        <span onClick={postComment}>
          <Button text="Post Comment" color="#AD1FEA" link="" />
        </span>
      </div>
    </div>
  );
};

export default PostComment;
