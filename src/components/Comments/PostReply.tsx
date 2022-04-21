import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import { postReply, useAppDispatch } from "../../slices/dataSlice";
import { useParams } from "react-router-dom";

interface User {
  username: string;
  name: string;
  image: string;
}

interface Props {
  props: {
    id: number;
    content: string;
    user: User;
    replyingTo?: string;
    replies?: {
      content: string;
    }[];
  };
  handleReplyClick: () => void;
}

const PostReply: React.FC<Props> = ({ props, handleReplyClick }) => {
  const { id } = useParams();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");

  const addPost = () => {
    dispatch(
      postReply({
        id: Number(id),
        content: value,
        commentId: props.id,
        replyingTo: props.user.username,
      })
    );
    handleReplyClick();
  };

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  console.log(props.id);
  return (
    <div>
      <textarea
        ref={textAreaRef}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your reply here"
      />
      <span onClick={addPost}>
        <Button text="Post Reply" color="#AD1FEA" link="" />
      </span>
    </div>
  );
};

export default PostReply;
