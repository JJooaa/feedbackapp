import { useEffect, useRef } from "react";
import Button from "../Button/Button";

const PostReply = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  return (
    <div>
      <textarea ref={textAreaRef} placeholder="Type your reply here"></textarea>
      <Button text="Post Reply" color="#AD1FEA" link="" />
    </div>
  );
};

export default PostReply;
