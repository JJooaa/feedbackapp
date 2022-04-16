import React, { useState } from "react";
import PostReply from "./PostReply";

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

const SingleComment: React.FC<Props> = ({ props, children }) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);

  const handleReplyClick = (): void => {
    setIsReplying((prevState) => !prevState);
  };

  const image: string = props.user.image.slice(21, props.user.image.length);

  return (
    <div className="comment-container">
      <div className="comment-user">
        <img
          className="user-image"
          src={require(`../../assets/user-images/${image}`)}
          alt="poop"
        />
        <div className="user-info-wrapper">
          <div className="user-info">
            <h2>{props.user.name}</h2>
            <p>@{props.user.username}</p>
          </div>
          <h3 onClick={handleReplyClick}>Reply</h3>
        </div>
      </div>
      <p>
        <span>{props.replyingTo && `@${props.replyingTo}`}</span>{" "}
        {props.content}
      </p>
      {isReplying && <PostReply props={props} />}
      {props.replies && <div className="replies-container">{children}</div>}
    </div>
  );
};

export default SingleComment;
