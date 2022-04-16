import { useEffect, useRef } from "react";
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
}
const PostReply: React.FC<Props> = ({ props }) => {
  const { id } = useParams();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();

  const addPost = () => {
    dispatch(postReply({ id: Number(id), text: "hello", commentId: props.id }));
  };

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  return (
    <div>
      <textarea ref={textAreaRef} placeholder="Type your reply here" />
      <span onClick={addPost}>
        <Button text="Post Reply" color="#AD1FEA" link="" />
      </span>
    </div>
  );
};

export default PostReply;
