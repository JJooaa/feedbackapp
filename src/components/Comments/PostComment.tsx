import React, { useRef, useState } from "react";
import Button from "../Button/Button";

interface User {
  username: string;
  name: string;
  image: string;
}
interface Props {
  setItem: any;
  comment: {
    content: "string";
    id: number;
    user: User;
    replies?: {}[];
  }[];
}
const PostComment: React.FC<Props> = ({ setItem, comment }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [state, setState] = useState<number>(0);

  const handleValueChange = (): void => {
    if (textAreaRef.current?.value.length !== undefined) {
      setState(textAreaRef.current.value.length);
    }
  };

  const onSubmitClick = () => {
    // setItem((prevState: any) => [
    //   ...prevState[0].comments,
    //   {
    //     id: 12,
    //     content: "this is a comment",
    //     user: {
    //       image: "./assets/user-images/image-jackson.jpg",
    //       name: "Jackson Barker",
    //       username: "countryspirit",
    //     },
    //   },
    // ]);
    setItem({});
  };

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
      ></textarea>
      <div>
        <p>{250 - state} characters left</p>
        <span onClick={() => onSubmitClick()}>
          <Button text="Post Comment" color="#AD1FEA" link="" />
        </span>
      </div>
    </div>
  );
};

export default PostComment;
