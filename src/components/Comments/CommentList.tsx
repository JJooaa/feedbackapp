import "./comments.scss";
import PostComment from "./PostComment";
import SingleComment from "./SingleComment";

interface User {
  username: string;
  name: string;
  image: string;
}
interface Props {
  setItem?: any;
  comment: {
    content: "string";
    id: number;
    user: User;
    replies?: {}[];
  }[];
}

const CommentList = ({ comment, setItem }: Props) => {
  return (
    <>
      <div className="comments-wrapper">
        <h1>{comment ? comment.length : 0} Comments</h1>
        {comment &&
          comment.map((item, index) => (
            <SingleComment key={index} index={index} item={item} />
          ))}
      </div>
      <PostComment setItem={setItem} comment={comment} />
    </>
  );
};

export default CommentList;
