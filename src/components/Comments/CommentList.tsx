import "./comments.scss";
import PostComment from "./PostComment";
import SingleComment from "./SingleComment";

interface User {
  username: string;
  name: string;
  image: string;
}
interface Props {
  comment: {
    content: "string";
    id: number;
    user: User;
    replies?: {
      content: string;
      replyingTo: string;
    }[];
  }[];
}

const CommentList = ({ comment }: Props) => {
  return (
    <>
      <div className="comments-wrapper">
        <h1>{comment ? comment.length : 0} Comments</h1>
        {comment &&
          comment.map((item, index) => (
            <SingleComment key={index} props={item}>
              {item.replies &&
                item.replies.map((reply: any, idx) => (
                  <SingleComment key={idx} props={reply}></SingleComment>
                ))}
            </SingleComment>
          ))}
      </div>
      <PostComment />
    </>
  );
};

export default CommentList;
