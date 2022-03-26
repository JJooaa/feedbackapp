import "../../styles/commentList.scss";
import Button from "../Button/Button";
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
        replies?: {}[];
    }[];
}

const CommentList = ({ comment }: Props) => {
    return (
        <>
            <div className="comments-wrapper">
                <h1>{comment && comment.length} Comments</h1>
                {comment &&
                    comment.map((item, index) => {
                        console.log(item);
                        const image = item.user.image.slice(
                            21,
                            item.user.image.length
                        );
                        return (
                            <SingleComment
                                key={index}
                                index={index}
                                item={item}
                                image={image}
                            />
                        );
                    })}
            </div>
            <div className="leave-comment-container">
                <h2>Add Comment</h2>
                <textarea
                    name=""
                    id=""
                    placeholder="Type your comment here"
                ></textarea>
                <div>
                    <p>250 Characters left</p>
                    <Button text="Post Comment" color="#AD1FEA" />
                </div>
            </div>
        </>
    );
};

export default CommentList;
